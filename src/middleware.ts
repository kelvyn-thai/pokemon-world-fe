import { NextRequest, NextResponse } from "next/server";
import { authServices } from "@/services";

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();

  if (!authServices.checkIsAuthenticated(request)) {
    const { access_token, refresh_token } =
      await authServices.handleRequestCheckAuthenticate();

    response.cookies.set("access_token", access_token);
    response.cookies.set("refresh_token", refresh_token);
  }

  return response;
};

export const config = {
  // matcher: "/profile/:path*",
  runtime: "nodejs",
};
