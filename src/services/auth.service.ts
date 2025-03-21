import { NextRequest } from "next/server";
import { delay } from "@/utils";

export default class AuthServices {
  constructor() {}

  public async checkAuthen(): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    await delay(2000);
    return {
      access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3NDI0NDk3NzQsImV4cCI6MTc3Mzk4NTc3NCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.mv7Jg9lxwME6gvbtcBFq-LQE1l3hAxiSWPgcnmHl2IQ",
      refresh_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3NDI0NDk3NzQsImV4cCI6MTc3Mzk4NTc3NCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.mv7Jg9lxwME6gvbtcBFq-LQE1l3hAxiSWPgcnmHl2IQ",
    };
  }

  public checkIsAuthenticated(request: NextRequest) {
    const isAuthenticated = !!request.cookies.get("access_token");
    return isAuthenticated;
  }

  public async handleRequestCheckAuthenticate(): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    return await this.checkAuthen();
  }
}

export const authServices = new AuthServices();
