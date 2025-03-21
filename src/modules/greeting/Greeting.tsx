import Image from "next/image";
import { use } from "react";
import {
  UserEntity,
  GetUserResponseDTO,
  GetUserResponseSchema,
} from "@/schemas";
import { GreetingWrapper } from "./components";

function Greeting({ userInfo }: { userInfo: Promise<UserEntity> }) {
  const res = use(userInfo);

  const data: GetUserResponseDTO = GetUserResponseSchema.parse(res);

  return (
    <GreetingWrapper>
      {data && (
        <div className="absolute-center text-center flex flex-col items-center gap-4">
          <Image
            width={128}
            height={128}
            alt={"My avatar"}
            src={data.avatar_url}
            className="rounded-full"
            data-testid="avatar"
          />
          <p
            className="text-base  text-neutral-800 font-medium mb-8"
            data-testid="name"
          >
            Hello, I am {data.name}
          </p>
          <h2
            className="text-5xl text-neutral-1000 leading-6xl font-bold m-w-[550px]"
            data-testid="bio"
          >
            {data.bio}
          </h2>
        </div>
      )}
    </GreetingWrapper>
  );
}

export default Greeting;
