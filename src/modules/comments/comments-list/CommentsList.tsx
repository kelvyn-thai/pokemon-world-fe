import { faker } from "@faker-js/faker";
import { Suspense, use } from "react";
import { v4 } from "uuid";
import { delay } from "@/utils";

type Comment = {
  id: string;

  code: string;

  title: string;

  content: string;

  author: string;

  date: string;
};

const mockComments: Comment[] = [...Array(10)].map((_, index) => ({
  id: v4(),
  code: String(index + 1),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraph(),
  author: faker.person.fullName(),
  date: faker.date.past().toISOString(),
}));

const getComments = async (): Promise<Comment[]> => {
  await delay(3000);
  return mockComments;
};

function Comments({ comments }: { comments: Promise<Comment[]> }) {
  const data = use(comments);

  if (!data.length) {
    return <div>Comments not found! </div>;
  }

  return (
    <div className="bg-black">
      {data.map((foundComment) => (
        <div key={foundComment.id}>
          <h1>{foundComment.title}</h1>
          <p>{foundComment.content}</p>
          <p>{foundComment.author}</p>
          <p>{foundComment.date}</p>
        </div>
      ))}
    </div>
  );
}

export default function CommentsList() {
  const comments = getComments();
  return (
    <Suspense fallback={<div className="text-black">Loading...</div>}>
      <Comments comments={comments} />
    </Suspense>
  );
}

// export default async function CommentsList() {
//   const data = await getComments();
//
//   if (!data.length) {
//     return <div>Comments not found! </div>;
//   }
//
//   return (
//     <div className="bg-black">
//       {data.map((foundComment) => (
//         <div key={foundComment.id}>
//           <h1>{foundComment.title}</h1>
//           <p>{foundComment.content}</p>
//           <p>{foundComment.author}</p>
//           <p>{foundComment.date}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
