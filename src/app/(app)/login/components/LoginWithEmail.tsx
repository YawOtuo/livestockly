import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { VerifyFarmExists } from "@/lib/api/farm";
import LoginButtons from "./LoginButtons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "@/lib/redux/reducers/users";
import { CustomLoaders } from "@/components/Loaders";
import Link from "next/link";
import useFirebaseAuth from "@/lib/hooks/useFirebaseAuth";
import { RootState } from "@/lib/redux/store";
import { Farm } from "@/lib/types/farm";

type Props = {
  page?: string;
};

function LoginWithEmail({ page }: Props) {
  const {
    logInWithEmailAndPassword,
    loginWithGoogle,
    registerWithEmailAndPassword,
    signUpWithGoogle,
    loading,
    errorText,
  } = useFirebaseAuth();

  const router = useRouter();
  const dispatch = useDispatch();

  const [showFields, setShowFields] = useState(false);

  const farm = useSelector((state : RootState) => state.farm.farm);

  const handleGoogleSignUp = () => {
    signUpWithGoogle(farm as Farm);
  };

  const handleSubmit = (values : any) => {
    page != "sign-up" &&
      logInWithEmailAndPassword(values?.email, values?.password);

    page == "sign-up" &&
      registerWithEmailAndPassword(
        farm as Farm,
        values?.username,
        values?.email,
        values?.password
      );
  };

  return (
    <div>
      {farm?.id ? (
        <div className="flex flex-col gap-4">
          {!showFields && (
            <LoginButtons
              onClick={() => setShowFields(true)}
              variant="email"
              content={
                page == "sign-up" ? "Sign up with email" : "Login with email"
              }
            />
          )}
          {showFields && (
            <Formik
              initialValues={{}}
              onSubmit={(values: any) => handleSubmit(values)}>
              {({ handleSubmit, handleBlur, values, errors, handleChange }) => (
                <Form className="flex flex-col gap-5">
                  <div className="flex flex-col  gap-5">
                    {errorText && (
                      <p className="text-sm  text-red-700 font-semibold ">
                        {errorText}{" "}
                      </p>
                    )}

                    {page == "sign-up" && (
                      <TextField
                        className="w-full"
                        label="USERNAME"
                        name="username"
                        required={true}
                        onChange={handleChange}
                        value={values.username}
                      />
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
                    content={
                      page == "sign-up"
                        ? "Sign up with email"
                        : "Login with email"
                    }
                  />
                </Form>
              )}
            </Formik>
          )}

          <p>or</p>

          <div className="flex flex-col gap-5 border-2 rounded-md">
            <LoginButtons
              onClick={page == "sign-up" ? handleGoogleSignUp : loginWithGoogle}
              type="submit"
              variant="google"
              content={
                page == "sign-up" ? "Sign up with google" : "Login with google"
              }
            />
          </div>

          {page !== "sign-up" && (
            <div>
              <p>
                Don&apos;t have an account?{" "}
                <Link href={"/sign-up"}>
                  <span className="text-green1 font-semibold">Sign up</span>
                </Link>
              </p>
            </div>
          )}

          {page == "sign-up" && (
            <div>
              <p>
                Already have an account?{" "}
                <Link href={"/login"}>
                  <span className="text-green1 font-semibold">Login</span>
                </Link>
              </p>
            </div>
          )}
        </div>
      ) : (
        <CustomLoaders colour="green1" variant="syncloader" />
      )}
    </div>
  );
}

export default LoginWithEmail;
