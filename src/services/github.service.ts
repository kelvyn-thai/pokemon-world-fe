import { UserEntity, UserEntitySchema } from "@/schemas";
// TODO: inheritance from axios instance and use interceptor to authenticate, authorization, validate schema,...
export default class GithubService {
  // TODO: find the way to validate request / response dto
  async getUserInfo(username: string): Promise<UserEntity> {
    const url = `https://api.github.com/users/${username}`;

    const res = await fetch(url, {
      method: "GET",
      next: { tags: [username], revalidate: 3600 }, // 1 hour cache
    }).then((res) => res.json());

    return UserEntitySchema.parse(res);
  }
}

export const githubService = new GithubService();
