import { useNavigate } from "react-router-dom";
import { setAuthenticated } from "../redux/reducers/users";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

export const Logout = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
  <div className={!props.nav ? `md:hidden` : "text-white"}>
      <Button
        onClick={(e) => {
          localStorage.setItem("authToken", 0);
          dispatch(setAuthenticated("false"));
          localStorage.setItem("isAuthenticated", "false");
          navigate("/login");
        }}>
        <p 
        className={!props.nav ? `md:hidden first-letter:text-left text-white m-0 p-0` : ""}
        >Logout</p>
      </Button>
  </div>
  );
};
