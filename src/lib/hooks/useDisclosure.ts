"use client";

import { useState } from "react";

function useDisclosure() {
  const [open, setOpen] = useState<boolean>();
  return {
    open,
    setOpen,
  };
}

export default useDisclosure;
