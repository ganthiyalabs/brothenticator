export interface TOTPData {
  issuer: string | undefined ;
  label: string | undefined ;
  secret: string;
  algorithm: string;
  digits: number;
  period: number;
}

export function parseTOTPURI(uri: string): TOTPData {
  const url = new URL(uri);
  const path = decodeURIComponent(url.pathname.slice(1));
  const [issuer, label] = path.split(':');
  const params = url.searchParams;
  const secret = params.get('secret') || '';
  const algorithm = params.get('algorithm') || 'SHA1';
  const digits = parseInt(params.get('digits') || '6', 10);
  const period = parseInt(params.get('period') || '30', 10);

  return {
    issuer,
    label,
    secret,
    algorithm,
    digits,
    period,
  };
}
