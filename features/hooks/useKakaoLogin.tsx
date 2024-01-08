import { useSession } from "next-auth/react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { kakaoSignIn } from "@/apis/auth";
import { KakaoSignInResponse } from "@/types/auth";

export async function useKakaoLogin() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.accessToken) {
    if (session.provider === "kakao") {
      const response = await kakaoSignIn(session.accessToken);
      if (response) {
        setCookie("accessToken", response.data.accessToken);
        if (response.data.isExistedUser) {
          router.push(`/main/${response.data.userId}`);
        } else {
          router.push("/info");
        }
      }
    }
  }
}


