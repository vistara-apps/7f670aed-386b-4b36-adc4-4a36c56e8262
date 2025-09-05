'use client';

import { useState, useEffect } from 'react';
import { useWalletClient, useAccount } from 'wagmi';
import { 
  processPayment, 
  checkPaymentStatus, 
  getUSDCBalance, 
  validatePaymentConfig,
  PaymentConfig,
  PaymentResult 
} from '@/lib/payments';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  X, 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  DollarSign,
  Wallet
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PaymentConfig;
  onSuccess?: (result: PaymentResult) => void;
  onError?: (error: string) => void;
}

type PaymentState = 'idle' | 'validating' | 'processing' | 'confirming' | 'success' | 'error';

export function PaymentModal({ 
  isOpen, 
  onClose, 
  config, 
  onSuccess, 
  onError 
}: PaymentModalProps) {
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();
  
  const [paymentState, setPaymentState] = useState<PaymentState>('idle');
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<string>('0.00');
  const [confirmations, setConfirmations] = useState<number>(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Load USDC balance when modal opens
  useEffect(() => {
    if (isOpen && walletClient && address) {
      loadUSDCBalance();
    }
  }, [isOpen, walletClient, address]);

  // Validate payment config
  useEffect(() => {
    if (isOpen) {
      const errors = validatePaymentConfig(config);
      setValidationErrors(errors);
    }
  }, [isOpen, config]);

  // Poll for confirmations after successful payment
  useEffect(() => {
    if (paymentState === 'confirming' && paymentResult?.transactionHash && walletClient) {
      const interval = setInterval(async () => {
        const status = await checkPaymentStatus(walletClient, paymentResult.transactionHash!);
        setConfirmations(status.confirmations);
        
        if (status.confirmations >= 3) {
          setPaymentState('success');
          clearInterval(interval);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [paymentState, paymentResult, walletClient]);

  const loadUSDCBalance = async () => {
    if (!walletClient || !address) return;
    
    try {
      const balance = await getUSDCBalance(walletClient, address);
      setUsdcBalance(balance);
    } catch (error) {
      console.error('Failed to load USDC balance:', error);
    }
  };

  const handlePayment = async () => {
    if (!walletClient || !isConnected) {
      onError?.('Wallet not connected');
      return;
    }

    if (validationErrors.length > 0) {
      onError?.('Invalid payment configuration');
      return;
    }

    setPaymentState('processing');
    
    try {
      const result = await processPayment(walletClient, config);
      setPaymentResult(result);
      
      if (result.success) {
        setPaymentState('confirming');
        setConfirmations(result.confirmations || 0);
        onSuccess?.(result);
      } else {
        setPaymentState('error');
        onError?.(result.error || 'Payment failed');
      }
    } catch (error) {
      setPaymentState('error');
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      onError?.(errorMessage);
    }
  };

  const handleClose = () => {
    setPaymentState('idle');
    setPaymentResult(null);
    setConfirmations(0);
    setValidationErrors([]);
    onClose();
  };

  if (!isOpen) return null;

  const isProcessing = paymentState === 'processing' || paymentState === 'confirming';
  const canPay = isConnected && validationErrors.length === 0 && paymentState === 'idle';
  const hasInsufficientBalance = parseFloat(usdcBalance) < parseFloat(config.amount);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isProcessing}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Payment Details */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="font-medium">${config.amount} USDC</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">To</span>
              <span className="font-mono text-xs">
                {config.recipient.slice(0, 6)}...{config.recipient.slice(-4)}
              </span>
            </div>
            
            {config.description && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Description</span>
                <span className="text-sm">{config.description}</span>
              </div>
            )}
          </div>

          {/* Wallet Balance */}
          {isConnected && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span className="text-sm">USDC Balance</span>
              </div>
              <span className="font-medium">${usdcBalance}</span>
            </div>
          )}

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="space-y-2">
              {validationErrors.map((error, index) => (
                <div key={index} className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              ))}
            </div>
          )}

          {/* Insufficient Balance Warning */}
          {hasInsufficientBalance && (
            <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              Insufficient USDC balance
            </div>
          )}

          {/* Payment Status */}
          {paymentState === 'processing' && (
            <div className="flex items-center gap-2 text-blue-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing payment...
            </div>
          )}

          {paymentState === 'confirming' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                Waiting for confirmations...
              </div>
              <div className="text-sm text-muted-foreground">
                Confirmations: {confirmations}/3
              </div>
              {paymentResult?.transactionHash && (
                <div className="text-xs font-mono text-muted-foreground">
                  Tx: {paymentResult.transactionHash.slice(0, 10)}...
                </div>
              )}
            </div>
          )}

          {paymentState === 'success' && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              Payment successful!
            </div>
          )}

          {paymentState === 'error' && (
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              Payment failed
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isProcessing}
              className="flex-1"
            >
              {paymentState === 'success' ? 'Close' : 'Cancel'}
            </Button>
            
            {paymentState !== 'success' && (
              <Button
                onClick={handlePayment}
                disabled={!canPay || hasInsufficientBalance || isProcessing}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Pay ${config.amount}
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
