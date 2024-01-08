import Loading from "@/components/units/Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";

import { useRouter } from "next/router";
export default function Page() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "loading") return <Loading />;
  if (!session) {
    router.replace("/login");
    console.log("session", session);
  }

  const userId = queryClient.getQueryData(["userId"]);
  console.log("userId - 메인으로 이동한 상태 ", userId);

  const { data, error, isLoading } = useQuery(["userId"], async () => {
    const session = await getSession();

    console.log("session", session);
    const accessToken = session?.accessToken;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/main/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        userId: userId,
      }
    );
    console.log("response.data", response.data);

    return response.data;
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div>
      <h1>Main Page for User {}</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>

      <div>
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
      </div>
    </div>
  );
}
