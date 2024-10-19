import { ToastContainer } from "react-toastify";
import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <main>
        <ToastContainer 
        position="bottom-center"
        autoClose={2000}
        pauseOnHover={false}/>
      <Header />
      <Outlet />
    </main>
  );
}
