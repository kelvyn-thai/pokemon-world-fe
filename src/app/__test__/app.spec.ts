import { faker } from "@faker-js/faker";
// import * as cheerio from "cheerio";
import { http, HttpResponse } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
import request from "supertest";
import { UserEntity } from "@/schemas";
import { GithubService, githubService } from "@/services";

describe("Test APP", () => {
  let server: SetupServerApi;
  const mockUsername = faker.internet.username();
  const mockUser: UserEntity = {
    avatar_url: faker.image.avatar(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.person.bio(),
  };

  beforeAll(() => {
    const handlers = [
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      http.get("https://api.github.com/users/:username", ({ params }) => {
        return HttpResponse.json({ ...mockUser });
      }),
    ];

    server = setupServer(...handlers);

    server.listen();
  });

  it("Should intercepted request by MSW", async () => {
    const response = await githubService.getUserInfo(mockUsername);

    expect(response).toMatchObject(mockUser);
  });

  it.only("Should render correctly Greetting", async () => {
    jest.spyOn(githubService, "getUserInfo").mockResolvedValue(mockUser); // not work

    jest
      .spyOn(GithubService.prototype, "getUserInfo")
      .mockResolvedValue(mockUser); // not work too

    const response = await request("http://localhost:3000").get("/"); // Fetch SSR HTML

    expect(response.status).toBe(200);

    // TODO: find the way to mock / intercept API later

    // const $ = cheerio.load(response.text); // Parse HTML
    //
    // // const avatarUrl = $("[data-testid='avatar']").attr("src");
    // const name = $("[data-testid='name']").text();
    // const bio = $("[data-testid='bio']").text();
    //
    // // expect(avatarUrl).toBe(mockUser.avatar_url);
    // expect(name).toBe(`Hello, I am ${mockUser.name}`);
    // expect(bio).toBe(mockUser.bio);
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
});
