import React, { forwardRef, useState } from "react";
import { countCharacters, truncateContent } from "../../../utils/countTexts";
import Input from "../../common/Input";
import Inputlabel from "../../common/InputLabel";
import Image from "next/image";
import bracketLeft from "@/assets/icons/bracket_left.svg";
import bracketRight from "@/assets/icons/bracket_right.svg";

interface LetterWritingProps {
  isEditor: string;
  letterSelection: Record<string, string>;
  onLetterContentChange: (content: string) => void;
  onToChange: (to: string) => void;
  onFromChange: (from: string) => void;
}

//eslint-disable-next-line react/display-name
const LetterWriting = forwardRef<HTMLInputElement, LetterWritingProps>(
  (
    {
      isEditor,
      letterSelection,
      onLetterContentChange,
      onToChange,
      onFromChange,
    },
    ref
  ) => {
    const [letterContent, setLetterContent] = useState("");
    const maxCharacters = 300;

    const handleContentChange = (e) => {
      let content = e.target.value;
      content = content.replace(/\n/g, "");

      const length = countCharacters(content);
      if (length > maxCharacters) {
        content = truncateContent(content, maxCharacters);
      }

      setLetterContent(content);
      onLetterContentChange(content);
    };

    const handleToChange = (e) => {
      const newTo = e.target.value;
      onToChange(newTo);
    };

    const handleFromChange = (e) => {
      const newFrom = e.target.value;
      onFromChange(newFrom);
    };

    return (
      <>
        <span className="text-lg text-center font-pretendard z-10">
          편지를 작성해주세요
        </span>
        <span className="flex flex-row justify-center w-full text-left font-pretendard">
          <Inputlabel label="To." required>
            <Input
              ref={ref}
              placeholder="받는 사람을 입력하세요."
              onChange={handleToChange}
            />
          </Inputlabel>
        </span>
        <div className="relative flex justify-center items-center text-center">
          <div className="relative w-[288px] h-[288px]">
            <img
              src="/assets/letter/letter-bg.svg"
              alt="letter background"
              className="absolute inset-0 w-full h-full z-0"
            />
            <textarea
              onChange={handleContentChange}
              placeholder="편지를 작성해주세요 :) "
              value={letterContent}
              className="absolute left-0 top-0
              inset-0 w-[192px] h-[165px] p-6 text-xs font-pretendard font-normal bg-transparent resize-none z-10"
            />
            <img
              src={letterSelection[`${isEditor}-letter`]}
              alt="letter"
              className="absolute inset-0 w-full h-full z-5"
            />
          </div>
        </div>

        <div className="absolute bottom-6 right-7">
          <div className="flex justify-center items-center space-x-2">
            <Image src={bracketLeft} alt="bracket-left" />
            <p className="text-xs text-right font-pretendard ">
              {countCharacters(letterContent)} / {maxCharacters}
            </p>
            <Image src={bracketRight} alt="bracket-right" />
          </div>
        </div>

        <div className="flex flex-row justify-center w-full text-left font-pretendard">
          <Inputlabel label="From." required>
            <Input
              placeholder="보내는 사람을 입력하세요."
              onChange={handleFromChange}
            />
          </Inputlabel>
        </div>
      </>
    );
  }
);

export default LetterWriting;
