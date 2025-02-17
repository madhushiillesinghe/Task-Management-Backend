import crypto from 'node:crypto';

// Type the token parameter as string or number
const hashToken = (token: string | number): string => {
  // hash the token using sha256
  return crypto.createHash('sha256').update(token.toString()).digest('hex');
};

export default hashToken;
