import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { VerifyFarmExists } from "@/lib/api/farm";
import LoginWithEmail from "./LoginWithEmail";


type Props = {
    page?: string
}
function LoginOptions({page} : Props) {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyFarm = useMutation((data: string) => VerifyFarmExists(data), {
    onSuccess: () => {
      setLoading(false);
      queryClient.invalidateQueries([`farm`]);
    },
    onMutate: (newItem) => {
      setLoading(true);
    },
  });

  const handleVerify = async (newItem : string) => {
    verifyFarm.mutate(newItem);
  };
  return (
    <div>
      <LoginWithEmail page={page}/>
    </div>
  );
}

export default LoginOptions;
