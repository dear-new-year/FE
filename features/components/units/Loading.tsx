import Image from "next/image";
import loading from "@/assets/icons/loading.svg";

const Loading = () => {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto p-4 px-10 space-y-10 font-pretendard font-semibold ">
      <Image src={loading} alt="loading" className="animate-bounce w-12 h-12" />
      <h1 className="text-base">잠시만 기다려 주세요...</h1>
      <div className="flex flex-col items-center justify-center z-10 py-4 font-pretendard font-normal text-sm text-center space-y-0.5"></div>
    </div>
  );
};

export default Loading;
