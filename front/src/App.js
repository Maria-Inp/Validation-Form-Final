import { ToastContainer } from "react-toastify";
import MainRouter from "./routes/MainRouter";

const App = () => {
  return (
    <>
      <MainRouter />
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default App;
