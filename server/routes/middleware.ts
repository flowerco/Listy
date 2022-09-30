import { auth } from "express-oauth2-jwt-bearer";
import * as User from "../models/User";
import express, { NextFunction } from "express";
import { expressjwt, GetVerificationKey } from "express-jwt";
import jwksRsa from "jwks-rsa";
import { expressJwtSecret } from "jwks-rsa";
import * as dotenv from "dotenv";

dotenv.config();
// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
export const checkJwt = expressjwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }) as GetVerificationKey,
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

interface AuthReq extends Express.Request {
  auth: {
    userId: string;
    payload: string;
  };
  currUser: {
    followers: string[];
    following: string[];
  };
}

export const checkJwt2 = async (
  req: AuthReq,
  res: express.Response,
  next: NextFunction
) => {
  req.auth.userId = req.auth.payload.split("|")[1];
  // req.auth.userId is the userId'req.auth' is possibly 'undefined'.ts(18048
  // console.log(req.auth.userId)

  //check if user is in the data base
  console.log(req.auth.userId);
  let user = await User.findById(req.auth.userId);
  console.log(user);
  if (!user) {
    console.log("auth0 user does not exsist in local database, creating...");
    const newUser = new User({ _id: req.auth.userId });
    await newUser.save();
    user = newUser;
    // req.verifiedId = newUser_id
  }
  req.currUser = user;
  next();
};
