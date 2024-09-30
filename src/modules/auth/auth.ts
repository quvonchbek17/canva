import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@errors";
import axios from "axios";
import * as qs from "qs";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

function generateCodeChallenge() {
  const codeVerifier = crypto.randomBytes(32).toString('hex');
  const hash = crypto.createHash('sha256').update(codeVerifier).digest('base64url');
  return { codeVerifier, codeChallenge: hash };
}

export class AuthController {
  static codeVerifier: string = '';

  static async getAuthUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { codeVerifier, codeChallenge } = generateCodeChallenge()
      AuthController.codeVerifier = codeVerifier

      const scope = [
        "app:read",
        "app:write",
        "design:content:read",
        "design:meta:read",
        "design:content:write",
        "design:permission:read",
        "design:permission:write",
        "folder:read",
        "folder:write",
        "folder:permission:read",
        "folder:permission:write",
        "asset:read",
        "asset:write",
        "comment:read",
        "comment:write",
        "brandtemplate:meta:read",
        "brandtemplate:content:read",
        "profile:read",
      ].join("%20")

      const authUrl = `https://www.canva.com/api/oauth/authorize?code_challenge=${codeChallenge}&code_challenge_method=s256&response_type=code&client_id=${process.env.CANVA_CLIENT_ID}&redirect_uri=${process.env.CANVA_REDIRECT_URI}&scope=${scope}`

      res.redirect(authUrl);
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async Login(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const { code } = req.query;

        const codeVerifier = AuthController.codeVerifier
        let credentials = Buffer.from(
          `${process.env.CANVA_CLIENT_ID}:${process.env.CANVA_CLIENT_SECRET}`
        ).toString("base64")

        let result = await axios.post('https://api.canva.com/rest/v1/oauth/token',
          qs.stringify({
            grant_type: 'authorization_code',
            code_verifier: codeVerifier,
            code,
            redirect_uri: process.env.CANVA_REDIRECT_URI
          }),
          {
            headers: {
              'Authorization': `Basic ${credentials}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
        )
       res.send(result.data)

      } catch (error:any) {
          next(new ErrorHandler(error.message, error.status))
      }
  }

  static async RefreshAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { refresh_token } = req.body;
      let credentials = Buffer.from(
        `${process.env.CANVA_CLIENT_ID}:${process.env.CANVA_CLIENT_SECRET}`
      ).toString("base64")

      let result = await axios.post('https://api.canva.com/rest/v1/oauth/token',
        qs.stringify({
          grant_type: 'refresh_token',
          refresh_token
        }),
        {
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      )

      res.status(200).json({
        success: true,
        message: "Access token muvaffaqiyatli yangilandi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.response?.data?.message || error.message, error.response?.status || 500));
    }
  }
}
