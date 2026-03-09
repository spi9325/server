import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class Super_Admin_Middleware implements NestMiddleware {

  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies?.token;

    if (!token) {
      throw new UnauthorizedException("Token missing");
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token);

      req["super-admin"] = decoded;

      next(); 

    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}