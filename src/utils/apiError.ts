import axios from "axios";

interface errorResponse {
  error: unknown;
  setError: (error: unknown) => void;
}

export const apiErrorResponse = ({ error, setError }: errorResponse) => {
  if (axios.isAxiosError(error)) {
    if (error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      console.log("An unexpected error ocurred. Please try again.", error);
    }
  }
};
