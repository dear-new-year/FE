import React, { useState } from "react";
import {
  albumSelection,
  letterSelection,
  phrasesSelection,
} from "../../utils/data";
import { useModal } from "../common/ShareModal";
import BackgroundColorful from "./BackSelect-Animation/BackgroundColorful";
import BackgroundSnow from "./BackSelect-Animation/BackgroundSnow";
import BackgroundCircles from "./BackSelect-Animation/BackgroundCircles";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";

interface CompletedAlbumProps {
  submittedAlbum: {
    editor: string;
    phrases: string;
    back: string;
    musicInfo: {
      id: number;
      youtubeUrlId: string;
      name: string;
      artist: string;
      thumbnail: string;
      category: string;
    };
    letter: string;
    to: string;
    from: string;
  };
}

const backSelection: Record<string, React.JSX.Element> = {
  colorful: <BackgroundColorful />,
  snow: <BackgroundSnow />,
  circles: <BackgroundCircles />,
};
const completeSvg: {
  editor: Record<
    "editor-love" | "editor-money" | "editor-success" | "editor-health",
    string
  >;
  deco: Record<
    "editor-love" | "editor-money" | "editor-success" | "editor-health",
    string
  >;
} = {
  editor: {
    "editor-love": "/assets/editor/editor-love-complete.svg",
    "editor-money": "/assets/editor/editor-money-complete.svg",
    "editor-success": "/assets/editor/editor-success-complete.svg",
    "editor-health": "/assets/editor/editor-health-complete.svg",
  },
  deco: {
    "editor-love": "/assets/editor/editor-deco-love.svg",
    "editor-money": "/assets/editor/editor-deco-money.svg",
    "editor-success": "/assets/editor/editor-deco-success.svg",
    "editor-health": "/assets/editor/editor-deco-health.svg",
  },
};

const CompleteAlbum: React.FC<CompletedAlbumProps> = ({ submittedAlbum }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const { open } = useModal({
    title: "공유하기",
    description: "* 공유를 하지 않으면 앨범은 영영 닿지 못할 거예요.",
    showCloseBtn: true,
  });

  const onClickModal = async () => {
    const result = await sendAlbumData();
    open();
  };

  const sendAlbumData = async () => {
    try {
      const session = await getSession();
      console.log(session);
      const accessToken = session?.accessToken;
      console.log("세션 액세스 토큰 잘 불러옴?", accessToken);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/album/send`,
        {
          albumInfo: {
            albumBackground: submittedAlbum.back,
            albumCover: submittedAlbum.editor,
            albumPhrases: submittedAlbum.phrases,
            fromName: submittedAlbum.from,
            letter: submittedAlbum.letter,
            musicId: submittedAlbum.musicInfo.youtubeUrlId,
            toName: submittedAlbum.to,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log("앨범보내기 실패에러", err);
    }
  };

  return (
    <div>
      <div className="relative -z-10">{backSelection[submittedAlbum.back]}</div>
      <div className="flex flex-col items-center justify-center w-full h-full z-10 max-w-sm max-h-sm m-auto font-pretendard space-y-6">
        <span className="w-full text-lg text-center z-10 mb-8">
          앨범이 완성되었습니다!
        </span>

        <span className="z-10 w-full text-left ml-10">
          To. <strong>{submittedAlbum.to}</strong>
        </span>

        <div
          className="z-10 relative cursor-pointer perspective-500 h-[288px] w-[288px]"
          onClick={handleCardClick}
        >
          <div className={`card ${isFlipped ? "flipped" : ""}`}>
            <div className="card-front z-10">
              <img src={completeSvg.editor[submittedAlbum.editor]} />
              <img
                src={completeSvg.deco[submittedAlbum.editor]}
                className="z-20 absolute top-[57%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                alt="deco"
              />
              <img
                src={phrasesSelection[submittedAlbum.phrases]}
                className="absolute top-[23%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                alt="phrases"
              />
              <div className="w-36 absolute top-[90%] left-[36%] transform -translate-x-1/2 -translate-y-1/2 flex text-[8px]">
                <img src="/assets/icons/bracket_left.svg" className="mr-0.5" />
                <span
                  className="truncate inline-block text-center whitespace-nowrap overflow-hidden text-ellipsis
                "
                >
                  <strong>{submittedAlbum.musicInfo.name} </strong> -
                  <strong> {submittedAlbum.musicInfo.artist}</strong>
                </span>
                <img src="/assets/icons/bracket_right.svg" className="ml-0.5" />
              </div>

              <img
                className="absolute top-[61%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[130px] h-[130px] rounded-full"
                src={submittedAlbum.musicInfo.thumbnail}
                alt="music-thumbnail"
              />
            </div>
            <div className="card-back">
              <img src={letterSelection[`${submittedAlbum.editor}-letter`]} />
              <div className="flex justify-center items-center text-[12px] absolute w-full h-full max-w-[200px] max-h-[200px]">
                {submittedAlbum.letter}
              </div>
            </div>
          </div>
        </div>

        <span className="text-right z-10 w-full mr-10">
          From. <strong>{submittedAlbum.from}</strong>
        </span>

        <span className="text-center text-gray-400 text-sm font-normal z-10 w-full max-w-sm m-auto">
          앨범을 클릭하여 뒷면을 확인하세요!
        </span>

        <button
          onClick={onClickModal}
          className="bg-black text-white w-full max-w-sm h-9 rounded z-10 m-auto "
        >
          <span className="text-sm">보내기</span>
        </button>
      </div>
    </div>
  );
};

export default CompleteAlbum;
