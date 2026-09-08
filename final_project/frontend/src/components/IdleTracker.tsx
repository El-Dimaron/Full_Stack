import { useIdleTimer } from "react-idle-timer";
import { infoToast } from "./toast/custom_toast";

export function IdleTracker() {
  useIdleTimer({
    timeout: 120 * 1000,

    onIdle: () => {
      infoToast("Ви ще тут? Продовжуйте перегляд товарів.");
    },

    debounce: 500,
  });

  return null;
}
