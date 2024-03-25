import AlbumSelect from "@/components/units/Select/AlbumSelect";
import createFunnel from "@/components/units/funnel/createFunnel";
import { FunnelProvider } from "@/contexts/useFunnelContexts";
import useNewAblumForm, { NewAlbumFormValues } from "@/hooks/useNewAlbumForm";
import { albumSelection, labelMap } from "@/utils/data";
import { playListSelection } from "@/utils/musicData";
import { useState } from "react";
import { Controller, FormProvider } from "react-hook-form";

const Page = () => {
  const { Funnel, Step, useFunnel } = createFunnel(["editor", "phrases"]);

  const { step, toPrevStep, toNextStep, hasPrevStep } = useFunnel();

  const newAblumForm = useNewAblumForm();

  const {
    handleSubmit,
    setFocus,
    setError,
    trigger,
    watch,
    register,
    formState,
  } = newAblumForm;
  const onSubmit = async (data: NewAlbumFormValues) => {
    console.log(data);
  };

  const [selectedOptions, setSelectedOptions] = useState({
    editor: "editor-love",
    phrases: "editor-1",
    back: "colorful",
    music: playListSelection[0].youtubeUrlId,
    letter: "",
  });
  const [selectedInput, setSelectedInput] = useState({
    to: "",
    from: "",
  });

  const handleMusicChange = (musicData) => {
    setSelectedOptions({ ...selectedOptions, music: musicData.music });
  };
  const handleOptionChange = (optionName: string, optionValue: string) => {
    setSelectedOptions({ ...selectedOptions, [optionName]: optionValue });
  };

  const handleInputChange = (inputName: string, inputValue: string) => {
    setSelectedInput({ ...selectedInput, [inputName]: inputValue });
  };

  return (
    <>
      <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto max-w-screen-sm max-h-screen-sm space-y-4 font-semibold">
        <div className="flex flex-row justify-between w-full max-w-sm px-8 z-10 font-pretendard ">
          <FunnelProvider value={{ toPrevStep, toNextStep }}>
            <FormProvider {...newAblumForm}>
              <Funnel step={step}>
                <Step name="editor">
                  <AlbumSelect
                    {...register("albumCover")}
                    albumSelection={albumSelection}
                    labelMap={labelMap}
                    isEditor={selectedOptions.editor}
                    onAlbumChange={(albumCover) =>
                      handleOptionChange("albumCover", albumCover)
                    }
                  />
                </Step>
              </Funnel>
            </FormProvider>
          </FunnelProvider>
        </div>
      </div>
    </>
  );
};

export default Page;
