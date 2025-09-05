import { WalletClient } from 'viem';
import { base } from 'viem/chains';
import { X402Client } from 'x402-axios';

// USDC contract address on Base
export const USDC_CONTRACT_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

// Payment configuration
export interface PaymentConfig {
  amount: string; // Amount in USDC (e.g., "10.00")
  recipient: string; // Recipient address
  description?: string;
  metadata?: Record<string, any>;
}

// Payment result
export interface PaymentResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
  confirmations?: number;
}

// Initialize X402 client with wallet
export function createX402Client(walletClient: WalletClient): X402Client {
  return new X402Client({
    walletClient,
    chain: base,
    tokenAddress: USDC_CONTRACT_ADDRESS,
  });
}

// Process payment using x402
export async function processPayment(
  walletClient: WalletClient,
  config: PaymentConfig
): Promise<PaymentResult> {
  try {
    const x402Client = createX402Client(walletClient);
    
    // Convert amount to wei (USDC has 6 decimals)
    const amountInWei = BigInt(Math.floor(parseFloat(config.amount) * 1_000_000));
    
    // Execute payment
    const transaction = await x402Client.pay({
      to: config.recipient,
      amount: amountInWei,
      metadata: {
        description: config.description,
        ...config.metadata,
      },
    });
    
    // Wait for transaction confirmation
    const receipt = await walletClient.waitForTransactionReceipt({
      hash: transaction.hash,
    });
    
    return {
      success: true,
      transactionHash: transaction.hash,
      confirmations: receipt.blockNumber ? 1 : 0,
    };
  } catch (error) {
    console.error('Payment failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown payment error',
    };
  }
}

// Check payment status
export async function checkPaymentStatus(
  walletClient: WalletClient,
  transactionHash: string
): Promise<{
  confirmed: boolean;
  confirmations: number;
  error?: string;
}> {
  try {
    const receipt = await walletClient.getTransactionReceipt({
      hash: transactionHash as `0x${string}`,
    });
    
    if (!receipt) {
      return { confirmed: false, confirmations: 0 };
    }
    
    const currentBlock = await walletClient.getBlockNumber();
    const confirmations = Number(currentBlock - receipt.blockNumber + 1n);
    
    return {
      confirmed: receipt.status === 'success',
      confirmations,
    };
  } catch (error) {
    console.error('Error checking payment status:', error);
    return {
      confirmed: false,
      confirmations: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Get USDC balance
export async function getUSDCBalance(
  walletClient: WalletClient,
  address: string
): Promise<string> {
  try {
    const balance = await walletClient.readContract({
      address: USDC_CONTRACT_ADDRESS,
      abi: [
        {
          name: 'balanceOf',
          type: 'function',
          stateMutability: 'view',
          inputs: [{ name: 'account', type: 'address' }],
          outputs: [{ name: '', type: 'uint256' }],
        },
        {
          name: 'decimals',
          type: 'function',
          stateMutability: 'view',
          inputs: [],
          outputs: [{ name: '', type: 'uint8' }],
        },
      ],
      functionName: 'balanceOf',
      args: [address as `0x${string}`],
    });
    
    // Convert from wei to USDC (6 decimals)
    const balanceInUSDC = Number(balance) / 1_000_000;
    return balanceInUSDC.toFixed(2);
  } catch (error) {
    console.error('Error getting USDC balance:', error);
    return '0.00';
  }
}

// Validate payment configuration
export function validatePaymentConfig(config: PaymentConfig): string[] {
  const errors: string[] = [];
  
  if (!config.amount || parseFloat(config.amount) <= 0) {
    errors.push('Amount must be greater than 0');
  }
  
  if (!config.recipient || !config.recipient.startsWith('0x')) {
    errors.push('Invalid recipient address');
  }
  
  if (config.recipient.length !== 42) {
    errors.push('Recipient address must be 42 characters long');
  }
  
  return errors;
}
