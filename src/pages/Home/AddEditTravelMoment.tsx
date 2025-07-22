import { MdAdd, MdClose, MdUpdate } from "react-icons/md";
import { ImageSelector } from "../../components/Input/ImageSelector";
import { DateSelector } from "../../components/Input/DateSelector";
import { useEffect, useState } from "react";
import { TagInput } from "../../components/Input/TagInput";
import { uploadImage } from "../../utils/uploadImage";
import { axiosInstance } from "../../api/axiosInstance";
import { toast } from "react-toastify";
import axios from "axios";

interface MomentsProps {
  id: string;
  imageUrl: string;
  isFavorite: boolean;
  story: string;
  title: string;
  userId: string;
  visitedDate: string;
  visitedLocation: string[];
}

interface AddEditTravelMomentProps {
  type: string;
  momentInfo: MomentsProps | null;
  onClose: () => void;
  getAllMoments: () => void;
}

export const AddEditTravelMoment = ({
  type,
  momentInfo,
  onClose,
  getAllMoments,
}: AddEditTravelMomentProps) => {
  const [visitedDate, setVisitedDate] = useState<Date>(
    momentInfo?.visitedDate ? new Date(momentInfo?.visitedDate) : new Date()
  );
  const [memoryImg, setMemoryImg] = useState<File | string | null>(
    momentInfo?.imageUrl || ""
  );
  const [title, setTitle] = useState<string>(momentInfo?.title || "");
  const [moment, setMoment] = useState<string>(momentInfo?.story || "");
  const [visitedLocation, setVisitedLocation] = useState<string[]>(
    momentInfo?.visitedLocation || []
  );
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

  // Edita um momento
  const updateCapturedMoment = async () => {
    const momentId = momentInfo?.id;

    try {
      let newImageUrl = "";

      let updateMomentData = {
        title,
        story: moment,
        imageUrl: memoryImg || "",
        visitedDate,
        visitedLocation,
      };

      // verifico se a imagem está prensete
      if (memoryImg && typeof memoryImg !== "string") {
        const imageUploadResponse = await uploadImage(memoryImg);
        // pegar a URL
        newImageUrl = imageUploadResponse.uploadFile || "";

        updateMomentData = {
          ...updateMomentData,
          imageUrl: newImageUrl,
        };
      }

      const response = await axiosInstance.put(
        `/edit-moments/${momentId}`,
        updateMomentData
      );

      if (response.data.moment) {
        toast.success("Moment updated successfuly");
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
      updateCapturedMoment();
    } else {
      addNewCapturedMoment();
    }
  };

  const handleDeleteMomentImg = async () => {
    const deleteImgResponse = await axiosInstance.delete("/delete-upload", {
      params: {
        imageUrl: memoryImg,
      },
    });

    if (deleteImgResponse.data) {
      const momentId = momentInfo?.id;

      const updateMomentData = {
        title,
        story: moment,
        visitedDate,
        visitedLocation,
        imageUrl: "",
      };

      // Updating moment
      await axiosInstance.put(`/edit-moments/${momentId}`, updateMomentData);
    }
  };

  const handleAddNewMomentClear = () => {
    if (type === "add") {
      setTitle("");
      setMemoryImg(null);
      setMoment("");
      setVisitedDate(new Date());
      setVisitedLocation([]);
    }
  };

  useEffect(() => {
    handleAddNewMomentClear();
  }, []);

  return (
    <section className="relative">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-slate-700">
          {" "}
          {type === "add" ? "Add Moment" : "Update Story"}
        </h2>
        <div>
          <div className="flex items-center gap-3 bg-violet-50/50 p-2 rounded-l-lg">
            {type === "add" ? (
              <button className="btn-small" onClick={handleUpdateOrAddClick}>
                <MdAdd /> ADD MOMENT
              </button>
            ) : (
              <button className="btn-small" onClick={handleUpdateOrAddClick}>
                <MdUpdate /> UPDATE MOMENT
              </button>
            )}
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

          <ImageSelector
            image={memoryImg}
            setImage={setMemoryImg}
            onHandleDeleteMomentImg={handleDeleteMomentImg}
          />

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
