import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { infoSvg, playListButton, tapButton } from "../features/utils/data";
import Inputlabel from "@/components/common/InputLabel";
import Input from "@/components/common/Input";
import RoundRadioButton from "@/components/common/RoundRadioButton";
import BorderRadioButton from "@/components/common/BorderRadioButton";
import PreivewInfo from "@/components/units/PreviewInfo";

import headphone from "../features/assets/headphone.svg";
import wtl from "../features/assets/wtl.svg";
import high from "../features/assets/high.svg";
import low from "../features/assets/low.svg";

export default function Page() {
  const {
    formState: { errors },
    watch,
    register,
    handleSubmit,
  } = useForm<{
    userName: string;
    mainBackground: string;
    mainLp: string;
  }>({
    mode: "onChange",
    defaultValues: {
      mainBackground: "pink",
      mainLp: "headphone",
    },
  });

  const router = useRouter();

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    email: string;
    userName: string;
    mainBackground: string;
    mainLp: string;
  } | null>(null);

  const isBackground = watch("mainBackground");
  const isLpDesign = watch("mainLp");

  const kakaoEmail = router.query.email;

  const onSubmit = (data: {
    userName: string;
    mainBackground: string;
    mainLp: string;
  }) => {
    console.log(data);
    setSubmittedData({
      email: kakaoEmail as string,
      userName: data.userName,
      mainBackground: data.mainBackground,
      mainLp: data.mainLp,
    });
    setIsFormSubmitted(true);
  };

  const onError = () => {};

  const onPrevious = () => {
    setSubmittedData(null);
    setIsFormSubmitted(false);
  };

  const onComplete = () => {
    console.log("Form submitted- 테스트 ", submittedData);
  };

  return (
    <>
      <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto space-y-10 max-w-screen-sm">
        <div className="w-full h-full flex flex-col justify-center m-auto">
          {!isFormSubmitted && (
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <div className=" z-10 m-auto px-8 space-y-10 my-20">
                <div className="flex flex-col w-full space-y-6 ">
                  {/* 닉네임 입력 */}
                  <Inputlabel
                    label="닉네임"
                    required
                    errorMessage={errors.userName?.message}
                  >
                    <Input
                      {...register("userName", {
                        required: "닉네임은 필수 입력입니다.",
                        minLength: {
                          value: 2,
                          message: "닉네임은 2글자 이상이어야 합니다.",
                        },
                        maxLength: {
                          value: 6,
                          message: "닉네임은 6글자 이하여야 합니다.",
                        },
                      })}
                      type="text"
                      placeholder="닉네임을 입력해주세요."
                    ></Input>
                  </Inputlabel>

                  {/* 배경색 선택 */}
                  <Inputlabel
                    label="배경색 선택"
                    required
                    errorMessage={errors.mainBackground?.message}
                  >
                    <div className="flex flex-row space-x-4">
                      <RoundRadioButton
                        {...register("mainBackground")}
                        label="pink"
                        isChecked={isBackground === "pink"}
                        id="pink"
                        value="pink"
                        className="bg-custom_pink"
                        name="mainBackground"
                      />
                      <RoundRadioButton
                        {...register("mainBackground")}
                        label="blue"
                        isChecked={isBackground === "blue"}
                        id="blue"
                        name="mainBackground"
                        value="blue"
                        className="bg-custom_skyblue"
                      />
                      <RoundRadioButton
                        {...register("mainBackground")}
                        label="silver"
                        isChecked={isBackground === "silver"}
                        id="silver"
                        name="mainBackground"
                        value="silver"
                        className="bg-custom_silver"
                      />
                      <RoundRadioButton
                        {...register("mainBackground")}
                        label="gold"
                        isChecked={isBackground === "gold"}
                        id="gold"
                        name="mainBackground"
                        value="gold"
                        className="bg-custom_gold"
                      />
                    </div>
                  </Inputlabel>

                  {/* LP 디자인 선택 */}
                  <Inputlabel
                    label="LP 디자인 선택"
                    required
                    errorMessage={errors.mainLp?.message}
                  >
                    <div className="flex flex-row space-x-4 pb-10">
                      <BorderRadioButton
                        {...register("mainLp")}
                        label="headphone"
                        isChecked={isLpDesign === "headphone"}
                        id="headphone"
                        name="mainLp"
                        value="headphone"
                        icons={headphone}
                      />
                      <BorderRadioButton
                        {...register("mainLp")}
                        label="wt"
                        isChecked={isLpDesign === "wtl"}
                        id="wtl"
                        name="mainLp"
                        value="wtl"
                        icons={wtl}
                      />
                      <BorderRadioButton
                        {...register("mainLp")}
                        label="high"
                        isChecked={isLpDesign === "high"}
                        id="high"
                        name="mainLp"
                        value="high"
                        icons={high}
                      />
                      <BorderRadioButton
                        {...register("mainLp")}
                        label="low"
                        isChecked={isLpDesign === "low"}
                        id="low"
                        name="mainLp"
                        value="low"
                        icons={low}
                      />
                    </div>
                  </Inputlabel>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleSubmit(onSubmit, onError)();
                  }}
                  className="w-full h-10 bg-black text-white rounded"
                >
                  미리보기
                </button>
              </div>
            </form>
          )}
          {isFormSubmitted && submittedData && (
            <PreivewInfo
              infoSvg={infoSvg}
              tapButton={tapButton}
              playListButton={playListButton}
              submittedData={submittedData}
              onPrevious={onPrevious}
              onComplete={onComplete}
            />
          )}
        </div>
      </div>
    </>
  );
}
