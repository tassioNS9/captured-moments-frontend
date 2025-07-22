import { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Navabar } from "../../components/Navbar";
import { EmptyCard } from "../../components/Card/EmptyCard";
import CapturedMomentCard from "../../components/Card/CapturedMomentCard";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";
import { AddEditTravelMoment } from "./AddEditTravelMoment";
import { ViewTravelMoment } from "./ViewTravelMoment";

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

interface ModalProps {
  isShow: boolean;
  type: string;
  data: MomentsProps | null;
}

export const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [allMoments, setAllMoments] = useState<MomentsProps[]>([]);
  const [openAddEditModal, setOpenAddEditModal] = useState<ModalProps>({
    isShow: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState<ModalProps>({
    isShow: false,
    type: "view",
    data: null,
  });
  const navigate = useNavigate();
  // Busca das informações de usuário
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      }
    }
  };

  // Pegar momentos registrados do usuário
  const getAllCapturedMoments = async () => {
    try {
      const response = await axiosInstance.get("get-all-moments");

      if (response.data.memories) {
        setAllMoments(response.data.memories);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.", error);
    }
  };

  const updateIsFavorite = async (moment: MomentsProps) => {
    try {
      const response = await axiosInstance.put(
        `/update-is-favorite/${moment.id}`,
        {
          isFavorite: !moment.isFavorite,
        }
      );

      if (response.data.moment) {
        toast.success("Moment Updated Successfuly");
        getAllCapturedMoments();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          console.log(error.response.data.message);
        }
      }
    }
  };

  // View de cada Story
  const handleViewStory = (moment: MomentsProps) => {
    setOpenViewModal({ isShow: true, type: "view", data: moment });
  };

  useEffect(() => {
    getUserInfo();
    getAllCapturedMoments();
  }, []);

  return (
    <>
      <Navabar userInfo={userInfo} />
      <main className="container mx-auto py-10">
        <div className="flex gap-7">
          <section className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              {/* CARD - MOMENT */}
              {allMoments.map((moment) => (
                <CapturedMomentCard
                  key={moment.id}
                  imageUrl={moment.imageUrl}
                  title={moment.title}
                  story={moment.story}
                  date={moment.visitedDate}
                  visitedLocation={moment.visitedLocation}
                  isFavorite={moment.isFavorite}
                  onFavoriteClick={() => updateIsFavorite(moment)}
                  onHandleViewStory={() => handleViewStory(moment)}
                />
              ))}
            </div>
            {/* <EmptyCard
              imgSrc={FlorestaImg}
              message="Begin your first Travel Story! Click the 'Add' button to capture your thoughts, ideas, and memories. Let`s get started!"
            /> */}
          </section>

          <aside className="w-[320px]" />
        </div>
      </main>

      {/* Add & Edit Captured Moment */}
      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        ariaHideApp={false}
        className="model-box"
      >
        <AddEditTravelMoment
          type={openAddEditModal.type}
          onClose={() => {
            setOpenAddEditModal({ isShow: false, type: "add", data: null });
          }}
          getAllMoments={() => getAllCapturedMoments()}
        />
      </Modal>

      {/* View Captured Moment */}
      <Modal
        isOpen={openViewModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        ariaHideApp={false}
        className="model-box"
      >
        <ViewTravelMoment
          momentInfo={openViewModal.data}
          onClose={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShow: false }));
          }}
          onEditClick={() => {
            // prevState mostra o estado anterior ou seja tudo o que tinha no estado anterior mais o isShow:false
            setOpenViewModal((prevState) => ({ ...prevState, isShow: false }));
            setOpenAddEditModal((prevState) => ({
              ...prevState,
              isShow: true,
              type: "edit",
            }));
          }}
          onDeleteClick={() => {}}
        />
      </Modal>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-violet-400 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShow: true, type: "add", data: null });
        }}
      >
        {" "}
        <MdAdd className="text-[32px] text-white" />
      </button>

      <ToastContainer />
    </>
  );
};
