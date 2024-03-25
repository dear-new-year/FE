import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { infoSvg, playListButton, tapButton } from "@/utils/data";
import Image from "next/image";
import pin from "features/assets/lp/lp-pin.svg";

const MainPage: React.FC = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userId = router.query.userId;
    const email = router.query.email;

    //userId와 토큰을 가지고 유저정보를 가져옴
    if (token && userId && email) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/main/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const userData = res.data;

            setUserInfo({
              email: email,
              userName: userData.userInfo.userName,
              mainBackground: userData.userInfo.mainBackground.toLowerCase(),
              mainLp: userData.userInfo.mainLp.toLowerCase(),
            });
            console.log(token);
            console.log(userId);
            console.log(userData);

            console.log(userData.userInfo.mainBackground);
            console.log(userData.userInfo.mainBackground.toLowerCase());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.query.userId, router.query.email]);

  return (
    <>
      {userInfo && (
        <div>
          <h1>{userInfo.email}</h1>
          <div className="flex flex-col w-full h-full items-center justify-center m-auto p-4 gap-2">
            <div className="relative max-w-[270px] max-h-[600px] mx-auto">
              <img
                className="w-full h-full object-cover "
                src={infoSvg.main[userInfo.mainBackground]}
                alt="preview-background"
              />

              <img
                className="absolute top-1/3 left-5 w-[230px] h-[230px] rotate-infinite"
                src={infoSvg.mainLp[userInfo.mainLp]}
                alt="preview-lpDesign"
              />
              <img
                src={tapButton[`tap-${userInfo.mainBackground}`]}
                alt="tap-button"
                className="absolute top-[35%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 animate-bounce w-[90px] h-[90px]
          "
              />
              <Image
                src={pin}
                alt="lp-pin"
                className="absolute top-[40%] left-[65%] w-[100px] h-[160px]"
              />
              <img
                className="absolute top-[63%] left-[8%] w-[90px] h-[90px]"
                src={playListButton[`playlist-${userInfo.mainBackground}`]}
                alt="playlist"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
