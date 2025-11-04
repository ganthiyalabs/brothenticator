import * as OTPAuth from 'otpauth';

export function generateRecoveryCode(secret: string, issuer: string, label: string, algorithm: string): string {
  const totp = new OTPAuth.TOTP({
    issuer,
    label,
    algorithm,
    digits: 6,
    period: 30,
    secret,
  });
  return totp.generate(); // Just one!
}
