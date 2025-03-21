import { Suspense } from "react";
import { Layout } from "@/components/layout";
import {
  GreetingSection,
  GreetingSkeleton,
  GreetingWrapper,
} from "@/modules/greeting";
import { UserEntity } from "@/schemas";
import { githubService } from "@/services";

export const revalidate = 180;

export default async function Page() {
  const userInfo: Promise<UserEntity> =
    githubService.getUserInfo("kelvyn-thai");

  return (
    <Layout>
      <Suspense
        fallback={
          <GreetingWrapper>
            <GreetingSkeleton />
          </GreetingWrapper>
        }
      >
        <GreetingSection userInfo={userInfo} />{" "}
      </Suspense>
    </Layout>
  );
}
