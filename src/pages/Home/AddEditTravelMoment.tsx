import { MdAdd, MdClose } from "react-icons/md";
import { ImageSelector } from "../../components/Input/ImageSelector";
import { DateSelector } from "../../components/Input/DateSelector";
import { useState } from "react";
import { TagInput } from "../../components/Input/TagInput";
import { uploadImage } from "../../utils/uploadImage";
import { axiosInstance } from "../../api/axiosInstance";
import { toast } from "react-toastify";
import axios from "axios";

interface AddEditTravelMomentProps {
  type: string;
  onClose: () => void;
  getAllMoments: () => void;
}

export const AddEditTravelMoment = ({
  type,
  onClose,
  getAllMoments,
}: AddEditTravelMomentProps) => {
  const [visitedDate, setVisitedDate] = useState<Date>(new Date());
  const [memoryImg, setMemoryImg] = useState<File | string | null>("");
  const [title, setTitle] = useState<string>("");
  const [moment, setMoment] = useState<string>("");
  const [visitedLocation, setVisitedLocation] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Adiciona um novo momento
  const addNewCapturedMoment = async () => {
    try {
      let imageUrl = "";

      // verifico se a imagem está prensente
      if (memoryImg && typeof memoryImg !== "string") {
        const imageUploadResponse = await uploadImage(memoryImg);
        // pegar a URL
        imageUrl = imageUploadResponse.uploadFile || "";
      }

      const response = await axiosInstance.post("add-registered-moment", {
        title,
        story: moment,
        imageUrl: imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate,
      });

      if (response.data) {
        toast.success("Moment added successfuly");
        getAllMoments();
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          console.log("An unexpected error ocurred. Please try again.", error);
        }
      }
    }
  };

  // Adiciono ou Edito
  const handleUpdateOrAddClick = () => {
    console.log("Input Data:", { title, moment, visitedDate, visitedLocation });

    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!moment) {
      setError("Please enter the moment");
      return;
    }
    setError("");

    if (type === "edit") {
      //updateCapturedMoment();
    } else {
      addNewCapturedMoment();
    }
  };

  return (
    <section className="relative">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-slate-700">Add Moment</h2>
        <div>
          <div className="flex items-center gap-3 bg-violet-50/50 p-2 rounded-l-lg">
            <button className="btn-small" onClick={handleUpdateOrAddClick}>
              <MdAdd /> Add Moment
            </button>
            <button>
              <MdClose className="text-sl text-slate-400" onClick={onClose} />
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs pt-2 text-right">{error}</p>
          )}
        </div>
      </header>

      <main>
        <div className="flex-1 flex flex-col gap-2 pt-4">
          <label className="input-label">TITLE</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="Write your memory here"
            value={title}
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />

          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>

          <ImageSelector image={memoryImg} setImage={setMemoryImg} />

          <div className="flex flex-col gap-2 mt-4">
            <header className="flex justify-between">
              <label className="input-label">MOMENT</label>

              <button></button>
            </header>
            <textarea
              className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
              placeholder="Your Moment"
              rows={10}
              value={moment}
              onChange={({ target }) => {
                setMoment(target.value);
              }}
            />
          </div>

          <div className="pt-3">
            <label
              htmlFor="
            "
            >
              <TagInput tags={visitedLocation} setTag={setVisitedLocation} />
            </label>
          </div>
        </div>
      </main>
    </section>
  );
};
