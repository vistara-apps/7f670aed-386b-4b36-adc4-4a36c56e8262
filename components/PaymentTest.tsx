'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { PaymentModal } from './PaymentModal';
import { PaymentConfig, PaymentResult } from '@/lib/payments';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  CreditCard, 
  TestTube, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Zap
} from 'lucide-react';

// Test recipient address (replace with actual test address)
const TEST_RECIPIENT = '0x742d35Cc6634C0532925a3b8D0C9e3e0C8b0e4c2';

export function PaymentTest() {
  const { isConnected } = useAccount();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>({
    amount: '5.00',
    recipient: TEST_RECIPIENT,
    description: 'Test payment for PollStore premium features',
    metadata: {
      testMode: true,
      feature: 'premium_polls',
    },
  });
  const [testResults, setTestResults] = useState<{
    success: boolean;
    message: string;
    transactionHash?: string;
  } | null>(null);

  const testScenarios = [
    {
      name: 'Small Payment',
      config: {
        ...paymentConfig,
        amount: '1.00',
        description: 'Small test payment',
      },
    },
    {
      name: 'Premium Feature',
      config: {
        ...paymentConfig,
        amount: '15.00',
        description: 'Premium poll features subscription',
      },
    },
    {
      name: 'Product Purchase',
      config: {
        ...paymentConfig,
        amount: '25.50',
        description: 'Product purchase via PollStore',
      },
    },
  ];

  const handleTestPayment = (config: PaymentConfig) => {
    setPaymentConfig(config);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (result: PaymentResult) => {
    setTestResults({
      success: true,
      message: 'Payment completed successfully!',
      transactionHash: result.transactionHash,
    });
    console.log('Payment successful:', result);
  };

  const handlePaymentError = (error: string) => {
    setTestResults({
      success: false,
      message: `Payment failed: ${error}`,
    });
    console.error('Payment failed:', error);
  };

  const clearResults = () => {
    setTestResults(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            X402 Payment Flow Testing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Test the x402 payment integration with USDC on Base. Make sure your wallet is connected and has USDC balance.
          </div>

          {!isConnected && (
            <div className="flex items-center gap-2 text-amber-600 p-3 bg-amber-50 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              Please connect your wallet to test payments
            </div>
          )}

          {/* Test Scenarios */}
          <div className="space-y-3">
            <h3 className="font-medium">Test Scenarios</h3>
            <div className="grid gap-3">
              {testScenarios.map((scenario, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{scenario.name}</div>
                    <div className="text-sm text-muted-foreground">
                      ${scenario.config.amount} USDC - {scenario.config.description}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleTestPayment(scenario.config)}
                    disabled={!isConnected}
                    size="sm"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Test Pay
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Test */}
          <div className="space-y-3">
            <h3 className="font-medium">Custom Test</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Amount (USDC)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={paymentConfig.amount}
                  onChange={(e) => setPaymentConfig({
                    ...paymentConfig,
                    amount: e.target.value,
                  })}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  placeholder="5.00"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Recipient</label>
                <input
                  type="text"
                  value={paymentConfig.recipient}
                  onChange={(e) => setPaymentConfig({
                    ...paymentConfig,
                    recipient: e.target.value,
                  })}
                  className="w-full mt-1 px-3 py-2 border rounded-md font-mono text-xs"
                  placeholder="0x..."
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <input
                type="text"
                value={paymentConfig.description || ''}
                onChange={(e) => setPaymentConfig({
                  ...paymentConfig,
                  description: e.target.value,
                })}
                className="w-full mt-1 px-3 py-2 border rounded-md"
                placeholder="Payment description"
              />
            </div>
            <Button
              onClick={() => handleTestPayment(paymentConfig)}
              disabled={!isConnected}
              className="w-full"
            >
              <Zap className="h-4 w-4 mr-2" />
              Test Custom Payment
            </Button>
          </div>

          {/* Test Results */}
          {testResults && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Test Results</h3>
                <Button variant="outline" size="sm" onClick={clearResults}>
                  Clear
                </Button>
              </div>
              <div className={`flex items-start gap-2 p-3 rounded-lg ${
                testResults.success 
                  ? 'text-green-700 bg-green-50' 
                  : 'text-red-700 bg-red-50'
              }`}>
                {testResults.success ? (
                  <CheckCircle className="h-4 w-4 mt-0.5" />
                ) : (
                  <AlertCircle className="h-4 w-4 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="font-medium">
                    {testResults.success ? 'Success' : 'Error'}
                  </div>
                  <div className="text-sm">{testResults.message}</div>
                  {testResults.transactionHash && (
                    <div className="text-xs font-mono">
                      Tx: {testResults.transactionHash}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Integration Notes */}
          <div className="space-y-3">
            <h3 className="font-medium">Integration Features</h3>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>wagmi useWalletClient integration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>x402-axios payment processing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>USDC on Base support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Transaction confirmation tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Comprehensive error handling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Balance validation</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        config={paymentConfig}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </div>
  );
}
