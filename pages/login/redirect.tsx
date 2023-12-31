import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Loading from "@/components/units/Loading";
import { useQueryClient } from "@tanstack/react-query";

const Redirect = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkUserMembership = async () => {
      try {
        if (status === "authenticated") {
          // 로그인이 되어있다면 회원인지 확인
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
            {
              email: session?.user?.email,
            }
          );

          if (response.status === 200) {
            const userId = response.data.userInfo.userId;
            queryClient.setQueryData(["userId"], userId);
            router.replace(`/main/${userId}`);
          } else {
            console.log("기타 응답 코드에 따라 처리");
            signOut();
          }
        }
      } catch (error) {
        if (error.response.status === 404) {
          console.log("로그인은 성공했지만, 우리 회원은 아님");
          router.replace("/info");
        }
      }
    };

    checkUserMembership();
  }, [router, status, session, queryClient]);

  return <Loading />;
};

export default Redirect;
