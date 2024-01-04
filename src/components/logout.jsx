import { useNavigate } from "react-router-dom";
import { setAuthenticated, setUserDetails } from "../redux/reducers/users";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { signOut } from "../api/apis";

export const Logout = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
  <div className={!props.nav ? `md:hidden` : "text-white"}>
      <Button
        onClick={(e) => {
          signOut()
          dispatch(setUserDetails(null))

          navigate("/login");
        }}>
        <p 
        className={!props.nav ? `md:hidden first-letter:text-left text-white m-0 p-0` : ""}
        >Logout</p>
      </Button>
  </div>
  );
};
