import "../App.css";
import { successToast } from "../features/toast/custom_toast";

export function Home() {
  const notify = () => {
    successToast("Yes, bitch");
  };

  return (
    <div className="page">
      <h1>Home Page</h1>

      <button onClick={notify}>Toast</button>
    </div>
  );
}
