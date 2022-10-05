import jwt from 'jsonwebtoken';
// import {}

const SUPER_SECRET_KEY = 'IS_GREGOR_ASLEEP?';

interface SessionDataPayload extends jwt.JwtPayload {
  expiresAt: number,
  userId: string
}

export const createSession = (userId: string) => {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);

  const newSession = {
    // No sessionId needed as session data is stored in token
    expiresAt: expiry.valueOf(),
    userId: userId
  };
  return jwt.sign(newSession, SUPER_SECRET_KEY);
}

export const expireSession = () => {
  const newSession = {
    expiresAt: -1,
    userId: 'Nope'
  }
  return jwt.sign(newSession, SUPER_SECRET_KEY);
}

export const getSession = (token: string) => {
  const sessionData = <SessionDataPayload>jwt.verify(token, SUPER_SECRET_KEY);

  if (sessionData.expiresAt < Date.now()) {
    console.log('Token has expired.');
    return undefined;
  }

  return sessionData;
} 