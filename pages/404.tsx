import Image from "next/image";
import Link from "next/link";
import oops from "@/assets/icons/oops.svg";

export default function Custom404() {
  return (
    <>
      <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto p-4 px-10 space-y-10 font-pretendard font-semibold ">
        <Image src={oops} alt="404" />
        <h1 className="text-xl"> 원하시는 페이지를 찾을 수 없습니다.</h1>
        <div className="flex flex-col items-center justify-center z-10 py-4 font-pretendard font-normal text-sm text-center space-y-0.5">
          <span>찾으려는 페이지의 주소가 잘못 입력되었거나,</span>
          <span> 주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.</span>
          <span>입력하신 페이지의 주소가 정확한지 확인해주세요.</span>
        </div>

        <Link href="/main">
          <div className="bg-black rounded-md text-center w-64 h-10 p-2  m-auto  items-center text-white text-sm font-pretendard font-semibold">
            <span>메인으로 돌아가기</span>
          </div>
        </Link>
      </div>
    </>
  );
}
