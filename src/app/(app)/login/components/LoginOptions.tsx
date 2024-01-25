import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { VerifyFarmExists } from "@/lib/api/farm";
import LoginWithEmail from "./LoginWithEmail";

function LoginOptions() {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyFarm = useMutation((data) => VerifyFarmExists(data), {
    onSuccess: () => {
      setLoading(false);
      queryClient.invalidateQueries(`farm`);
    },
    onMutate: (newItem) => {
      setLoading(true);
    },
  });

  const handleVerify = async (newItem) => {
    verifyFarm.mutate(newItem);
  };
  return (
    <div>
      <LoginWithEmail />
    </div>
  );
}

export default LoginOptions;
