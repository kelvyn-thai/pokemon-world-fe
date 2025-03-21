"use server";

export type FormData = {
  title: string;

  content: string;
};

export async function createPost({ title, content }: FormData) {
  //
  console.debug({ title, content });

  // Update data

  // Revalidate cache
}

// export async function deletePost(formData: FormData) {}
