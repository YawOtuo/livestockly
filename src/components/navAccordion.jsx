import { styled } from "@stitches/react";
import { useState } from "react";
import { NavButtons } from "./sideNav";
import { Link } from "react-router-dom";

// Define your styles using the styled function


const NavAccordion = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Root onClick={(e) => setOpen((init) => !init)}>
      <p>{props.label}</p>
      {open && (
        <div className="pt-5">
          {props.items.map((r) => (
            <NavButtons className="text-white" key={r}>
              <Link to={`/dashboard/${r}`}>
                <p className="capitalize">{r}</p>
              </Link>
            </NavButtons>
          ))}
        </div>
      )}
    </Root>
  );
};


const Root = styled("button", {
    color: "white",
    borderRadius: "5px",

  });
export default NavAccordion;
