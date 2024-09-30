import "./App.css";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./featured/authSlice";
import { Header, Footer } from "./components/index";

function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((e) => {
        console.log("UserData is not !", e);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [setLoader, dispatch]);
  return !loader ? (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) : (
    <>
      <h1>Loading state</h1>
    </>
  );
}

export default App;
