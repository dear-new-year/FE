import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "@/components/units/Loading";

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login/kakao/code?code=${code}`,

          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            // 로그인 성공
            console.log(res);

            let accessToken = res.headers.authorization;
            accessToken = accessToken.replace("Bearer ", "");
            localStorage.setItem("accessToken", accessToken);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            console.log("로그인 성공");
            //userInfo에 이메일 정보도 가져와야함

            const userEmail = res.data.userInfo.email;
            const userId = res.data.userInfo.userId;

            router.push({
              pathname: `/main/${userId}`,
              query: {
                token: accessToken,
                userId: userId,
                email: userEmail,
              },
            });
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            // 유효하지 않은 코드
            console.log(err.response);
          } else if (err.response && err.response.status === 404) {
            // 회원가입 필요
            console.log(err.response);

            console.log(err.response.data.userInfo.email);
            const kakaoEmail = err.response.data.userInfo.email
              ? err.response.data.userInfo.email
              : "";

            // 404 인 경우 우리 서비스 회원가입 페이지 이동
            router.push({
              pathname: "/info",
              query: {
                email: kakaoEmail,
              },
            });
          }
        });
    }
  }, [router]);

  return <Loading />;
}
