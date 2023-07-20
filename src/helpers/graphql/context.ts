import { Request } from "express";
import Token from "../token";
import _ from "lodash";
import { TokenExpiredError } from "jsonwebtoken";

export class Context {
  public req: Request;
  public token?: Token;
  public isAuth = false; // default user isAuth is not logged in
  public isTokenExpired = false;

  constructor(params: { req: Request }) {
    this.req = params.req;
    const token = _.get(this.req.headers, "x-token");

    if (token) {
      try {
        // if token decoded return true then isAuth update true
        this.token = Token.decode(token as string);
        this.isAuth = true;
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          this.isTokenExpired = true;
        }
      }
    }
  }
  get userId() {
    if (!this.isAuth) return null;
    return this.token?._id;
  }
  get scopes() {
    if (!this.isAuth) return [];
    if (!this.token) return [];
    return _.get(this.token, "payload.scopes", []);
  }

  auth(roles: string[]) {
    if (!this.isAuth) throw Error("UnAuthorized");
    if (!this.token) throw Error("UnAuthorized");
    if (!roles.includes(this.token?.role)) throw Error("Permission Denied");
    return this;
  }
  grant(scopes: string[]) {
    if (!this.isAuth) throw Error("UnAuthorized");
    if (!this.token) throw Error("UnAuthorized");
    if (!scopes.every((scope) => this.scopes.includes(scope)))
      throw Error("Permission Denied");
    return this;
  }
}
