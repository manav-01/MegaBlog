import { useDispatch } from "react-redux";
import { logout } from "../../featured/authSlice";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogoutHandler = () => {
      authService
        .logout()
        .then(() => {
          dispatch(logout());
          navigate("/login");
        })
        .catch((e) => console.log("Logout Error:: Logout unSuccessful ", e))
    ;
  };

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={onLogoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
