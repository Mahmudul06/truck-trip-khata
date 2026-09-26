import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { getFirebaseAuth, isFirebaseConfigured } from './firebase';

let confirmationResult: ConfirmationResult | null = null;

export function setupRecaptcha(buttonId: string): RecaptchaVerifier | null {
  if (!isFirebaseConfigured || typeof window === 'undefined') return null;
  const verifier = new RecaptchaVerifier(getFirebaseAuth(), buttonId, { size: 'invisible' });
  return verifier;
}

export async function sendOTP(phone: string, verifier: RecaptchaVerifier): Promise<boolean> {
  try {
    confirmationResult = await signInWithPhoneNumber(getFirebaseAuth(), `+91${phone}`, verifier);
    return true;
  } catch (err) {
    console.error('OTP send failed:', err);
    return false;
  }
}

export async function verifyOTP(otp: string): Promise<boolean> {
  if (!confirmationResult) return false;
  try {
    await confirmationResult.confirm(otp);
    return true;
  } catch {
    return false;
  }
}

export function verifyPin(inputPin: string, storedPin: string): boolean {
  return inputPin === storedPin;
}
