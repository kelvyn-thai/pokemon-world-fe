/**
 * @jest-environment node
 */
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";
import { instance, mock, reset, when } from "ts-mockito";
import { AuthServices } from "@/services";
import { middleware } from "./middleware";

describe("Test middleware", () => {
  let mockedRequest: NextRequest;
  let domain: string;

  beforeAll(() => {
    mockedRequest = mock(NextRequest);
    domain = "http://localhost:3000";

    const requestHeaders = new Headers();
    const cookies = new RequestCookies(requestHeaders);

    when(mockedRequest.headers).thenReturn(requestHeaders);
    when(mockedRequest.cookies).thenReturn(cookies);
  });

  afterEach(() => {
    reset(mockedRequest);
    jest.restoreAllMocks(); // Reset Jest mocks
  });

  // and then test
  test("Passes request along and sets auth cookies", async () => {
    const url = new URL("/profile", domain);
    const nextUrl = new NextURL(url);
    when(mockedRequest.nextUrl).thenReturn(nextUrl);

    const mockAuthTokens = {
      access_token: "something secret",
      refresh_token: "foo",
    };

    jest
      .spyOn(AuthServices.prototype, "handleRequestCheckAuthenticate")
      .mockResolvedValue(mockAuthTokens);

    const response: NextResponse<unknown> = await middleware(
      instance(mockedRequest),
    );

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.cookies.get("access_token")?.value).toBe(
      mockAuthTokens.access_token,
    );
    expect(response.cookies.get("refresh_token")?.value).toBe(
      mockAuthTokens.refresh_token,
    );
  });
});
