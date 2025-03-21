// import { InferGetServerSidePropsType, GetServerSideProps } from "next";
//
// type ContactInfo = {
//   name: string;
//
//   description: string;
//
//   phone: string;
//
//   email: string;
// };
//
// const ContactMePage = ({
//   contactInfo,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
//   // return <ContactMe />;
//   return <div>{JSON.stringify(contactInfo)}</div>;
// };
//
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
//
// const getContactInfo = async (): Promise<ContactInfo> => {
//   await delay(1000);
//   return {
//     name: "Kelvyn Thai",
//     phone: "0326683902",
//     email: "thainguyenhoangphatit@gmail.com",
//     description:
//       "As a software engineer with a degree from HCMUS and over seven years of professional experience, I am passionate about leveraging technology to solve social challenges. My goal is to develop innovative applications that create a meaningful impact on society.",
//   };
// };
//
// export const getServerSideProps = (async () => {
//   // Fetch data from external API
//   const res = await getContactInfo(); // Pass data to the page via props
//   return { props: { contactInfo: res } };
// }) satisfies GetServerSideProps<{ contactInfo: ContactInfo }>;
//
// export default ContactMePage;

type Post = {
  id: string;

  title: string;
};

export default async function Page() {
  const data = await fetch("https://api.vercel.app/blog");
  const posts = await data.json();
  return (
    <ul>
      {posts.map((post: Post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
