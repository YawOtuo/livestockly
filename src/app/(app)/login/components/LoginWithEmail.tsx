import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { VerifyFarmExists } from "@/lib/api/farm";
import LoginButtons from "./LoginButtons";
import {
  logInWithEmailAndPassword,
  loginWithGoogle,
  signInWithGoogle,
} from "@/lib/utils/firebase";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "@/lib/redux/reducers/users";
import { CustomLoaders } from "@/components/Loaders";

function LoginWithEmail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>();
  const [errorText, setErrorText] = useState<string>();
  const [showFields, setShowFields] = useState(false);

  const farm = useSelector((state) => state?.farm?.details);

  const handleGoogleLogin = () => {
    signInWithGoogle(farm);
  };

  return (
    <div className="flex flex-col gap-4">
      {!showFields && (
        <LoginButtons
          onClick={() => setShowFields(true)}
          variant="email"
          content="Login with email"
        />
      )}
      {showFields && (
        <Formik
          initialValues={{}}
          onSubmit={(values: any) => {
            setLoading(true);
            logInWithEmailAndPassword(values?.email, values?.password)
              .then((res) => {
                console.log(res);
                setLoading(false);
                dispatch(setUserDetails(res));
                router.push("/dashboard");
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);

                setErrorText("Invalid credentials");
              });
          }}>
          {({ handleSubmit, handleBlur, values, errors, handleChange }) => (
            <Form className="flex flex-col gap-5">
              <div className="flex flex-col  gap-5">
                {errorText && (
                  <p className="text-sm  text-red-700 font-semibold ">
                    {errorText}{" "}
                  </p>
                )}
                <TextField
                  className="w-full"
                  label="EMAIL"
                  name="email"
                  required={true}
                  onChange={handleChange}
                  value={values.email}
                />

                <TextField
                  className="w-full"
                  label="PASSWORD"
                  type="password"
                  name="password"
                  required={true}
                  onChange={handleChange}
                  value={values.password}
                />
                {loading && (
                  <CustomLoaders variant="syncloader" colour="green1" />
                )}
              </div>

          
                <LoginButtons
                  type="submit"
                  variant="email"
                  content="Login with email"
                />
            </Form>
          )}
        </Formik>
      )}

      <p>or</p>

      {farm?.id && (
        <div className="flex flex-col gap-5 border-2 rounded-md p-5">
          <LoginButtons
            onClick={loginWithGoogle}
            type="submit"
            variant="google"
            content="Login with google"
          />
        </div>
      )}
    </div>
  );
}

export default LoginWithEmail;
