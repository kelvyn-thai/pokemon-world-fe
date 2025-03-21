import { faker } from "@faker-js/faker";
import { v4 } from "uuid";
import { PostEntity, PostEntitySchema } from "@/schemas";

export default class PostService {
  async getPostList(): Promise<PostEntity> {
    return Promise.resolve(
      PostEntitySchema.parse({
        id: v4(),
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
      }),
    );
  }
}

export const postService = new PostService();
