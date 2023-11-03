import React, { forwardRef, useState } from "react";
import { countCharacters, truncateContent } from "../../../utils/countTexts";

interface LetterWritingProps {
  isEditor: string;
  to: string;
  from: string;
  letterSelection: Record<string, string>;
  onLetterContentChange: (content: string) => void;
}

//eslint-disable-next-line react/display-name
const LetterWriting = forwardRef<HTMLInputElement, LetterWritingProps>(
  ({ isEditor, to, from, letterSelection, onLetterContentChange }, ref) => {
    const [letterContent, setLetterContent] = useState("");
    const maxCharacters = 400;

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

    return (
      <>
        <span className="text-lg text-center font-pretendard z-10">
          편지를 작성해주세요
        </span>
        <div className="flex flex-col justify-center items-center relative z-10">
          <span className="flex flex-row justify-start w-full text-sm text-right font-pretendard gap-2 px-2">
            To. <strong>{to}</strong>
          </span>
          <div className="relative flex justify-center items-center text-center">
            <img
              src={letterSelection[`${isEditor}-letter`]}
              alt="letter"
              className="w-full h-full max-w-[288px] max-h-[288px]"
            />
            <div className="absolute bottom-6 right-7">
              <div className="flex justify-center items-center space-x-2">
                <img src="/assets/icons/bracket_left.svg" alt="bracket-left" />
                <p className="text-xs text-right font-pretendard ">
                  {countCharacters(letterContent)} / {maxCharacters}
                </p>
                <img
                  src="/assets/icons/bracket_right.svg"
                  alt="bracket-right"
                />
              </div>
            </div>
            <textarea
              onChange={handleContentChange}
              placeholder="편지를 작성해주세요 :) "
              value={letterContent}
              className="flex justify-center items-center text-[12px] absolute w-full h-full max-w-[200px] max-h-[200px] font-pretendard
            resize-none bg-transparent z-0 outline-none"
            />
          </div>
          <span className="flex flex-row justify-end w-full text-sm text-right font-pretendard gap-2 px-2">
            From. <strong>{from}</strong>
          </span>
        </div>
      </>
    );
  }
);

export default LetterWriting;