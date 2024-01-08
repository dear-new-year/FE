import { useKakaoLogin } from "@/hooks/useKakaoLogin";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  // const router = useRouter();

  // const handleKakaoLogin = async () => {
  //   try {
  //     await signIn("kakao", {
  //       callbackUrl: `${window.location.origin}/login/redirect`,
  //     });
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  useKakaoLogin();

  return (
    <>
      <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto p-4 px-10 space-y-10 ">
        <img src="/assets/main/main-logo.svg" alt="logo" />
        <div className="flex flex-col items-center justify-center z-10 py-4 font-pretendard font-semibold text-sm text-center space-y-0.5">
          <span>연말 연시 감사인사를 전할 사람을 위해</span>
          <span> 앨범을 제작하고 추천곡을 담아 보내보세요.</span>
          <span>이번 푸른 용의 해에는 특별한 방식으로</span>
          <span>마음을 전달해보는 건 어떨까요?</span>
        </div>

        <button
          // onClick={() => handleKakaoLogin()}
          onClick={() => signIn("kakao", { callbackUrl: "/login/redirect" })}
          className="bg-[#FAE100] 
          rounded-md text-center w-64 max-w-sm h-10 p-2 px-4 flex items-center"
        >
          <img src="/assets/icons/kakao.svg" alt="kakao" />

          <p className="text-center text-[#371D1E] text-base m-auto font-pretendard font-semibold">
            카카오로 시작하기
          </p>
        </button>
      </div>
    </>
  );
}
