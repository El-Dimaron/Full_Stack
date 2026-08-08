import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.scss";

export function successToast(message: string) {
  toast.success(message, {
    className: "custom-toast custom-toast--success",
  });
}

export function deleteToast(message: string) {
  toast.error(message, {
    className: "custom-toast custom-toast--delete",
  });
}
