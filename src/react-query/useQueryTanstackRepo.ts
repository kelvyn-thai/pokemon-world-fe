import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useQueryTanstackRepo = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repo-data"],
    queryFn: async () => {
      await delay(2000);
      return await axios.get("https://api.github.com/Repo/TanStack/query");
    },
  });

  return {
    isPending,
    error,
    data,
  };
};
