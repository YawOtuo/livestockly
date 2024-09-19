import { AnimatePresence } from "framer-motion";
import React from "react";

const PageSlide = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {children}
    </AnimatePresence>
  );
};

export default PageSlide;
