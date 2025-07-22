import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaRegFileImage } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

interface ImageSelectorProps {
  image: string | File | null;
  setImage: Dispatch<SetStateAction<File | string | null>>;
  onHandleDeleteMomentImg: () => void;
}

export const ImageSelector = ({
  image,
  setImage,
  onHandleDeleteMomentImg,
}: ImageSelectorProps) => {
  // useRef para seletor de arquivos
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file) {
      setImage(file[0]);
    }
  };

  const onChangeFile = () => {
    inputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    onHandleDeleteMomentImg();
  };

  useEffect(() => {
    if (typeof image === "string") {
      setPreviewUrl(image);
    } else if (image) {
      // cria o objeto URL
      setPreviewUrl(URL.createObjectURL(image));
    } else {
      setPreviewUrl("");
    }

    return () => {
      // Como o createObject aloca memoria pode causar vazamento se nao for liberado por isso usamos o revokeObjecURL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [image]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {/*Condição para mostrar a imagem ou nao*/}
      {!image ? (
        <button
          className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50"
          onClick={onChangeFile}
        >
          <div>
            <FaRegFileImage className="text-xl text-violet-500" />
          </div>

          <p className="text-sm text-slate-500">
            Browser image files to upload
          </p>
        </button>
      ) : (
        <div className="w-full relative">
          <img
            src={previewUrl}
            alt="Selected"
            className="w-full h-[300px] object-cover rounded-lg"
          />

          <button
            className="btn-small btn-delete absolute top-2 right-2"
            onClick={handleRemoveImage}
          >
            <MdDeleteOutline className="text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};
