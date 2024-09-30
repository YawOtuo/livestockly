// import { styled } from "@stitches/react";
// import { useState } from "react";
// // import { NavButtons } from "./sideNav";
// import Link from "next/link";

// // Define your styles using the styled function
// type Props = {
//   label: string;
//   items: any;
// };

// const NavAccordion = ({ label, items }: Props) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <Root onClick={(e) => setOpen((init) => !init)}>
//       <p>{label}</p>
//       {open && (
//         <div className="pt-5">
//           {items.map((r: any) => (
//             <NavButtons className="text-white" key={r}>
//               <Link href={`/dashboard/${r}`}>
//                 <p className="capitalize">{r}</p>
//               </Link>
//             </NavButtons>
//           ))}
//         </div>
//       )}
//     </Root>
//   );
// };

// const Root = styled("button", {
//   color: "white",
//   borderRadius: "5px",
// });
// export default NavAccordion;
