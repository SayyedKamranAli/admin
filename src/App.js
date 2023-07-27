import All_router from "./routes/all_router";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div>
      <All_router />
      <ToastContainer />
    </div>
  );
}

export default App;
