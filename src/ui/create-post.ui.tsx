import { createPost } from "@/actions";

export function FormCreatePost() {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <form action={createPost as any}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" data-testid="title" name="title" />
      <label htmlFor="content">Content</label>
      <input type="text" id="content" data-testid="content" name="content" />
      <button type="submit">Create</button>
    </form>
  );
}
