import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const NewAlbumSchema = z.object({
  albumBackground: z.string(),
  albumCover: z.string(),
  albumId: z.number(),
  albumPhrases: z.string(),
  fromName: z.string(),
  letter: z.string(),
  musicArtist: z.string(),
  musicName: z.string(),
  toName: z.string(),
  youtubeUrlId: z.string(),
});

export type NewAlbumFormValues = z.infer<typeof NewAlbumSchema>;

const useNewAblumForm = () => {
  return useForm<NewAlbumFormValues>({
    defaultValues: {
      albumBackground: "",
      albumCover: "",
      albumId: 0,
      albumPhrases: "",
      fromName: "",
      letter: "",
      musicArtist: "",
      musicName: "",
      toName: "",
      youtubeUrlId: "",
    },
    resolver: zodResolver(NewAlbumSchema),
  });
};

export default useNewAblumForm;
