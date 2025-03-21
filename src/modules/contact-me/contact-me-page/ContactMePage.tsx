import axios from "axios";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";

type Repo = {
  name: string;

  description: string;

  subscribers_count: string;

  stargazers_count: string;

  forks_count: string;
};

const ContactMePage = ({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // return <ContactMe />;
  return <div>{JSON.stringify(repo)}</div>;
};

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await axios.get("https://api.github.com/Repo/TanStack/query");
  // Pass data to the page via props
  return { props: { repo: res.data } };
}) satisfies GetServerSideProps<{ repo: Repo }>;

export default ContactMePage;
