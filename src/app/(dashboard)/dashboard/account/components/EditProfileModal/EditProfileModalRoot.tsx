import { AddUserBody, UpdateUser } from "@/lib/api/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AccountAddImage } from "./AccountAddImage";
import { TextField } from "@mui/material";
import { RootState } from "@/lib/redux/store";

type Props = {
  setOpen?: any;
  user?: any;
};
function EditProfileModalRoot({ setOpen, user }: Props) {
  const userSqlData = useSelector((state : RootState) => state?.users?.userSqlData);
  const queryClient = useQueryClient();
  const [image, setImage] = useState();
  const [changeImage, setChangeImage] = useState<boolean>(false);
  const [files, setFiles] = useState();

  const updateMutation = useMutation((data : AddUserBody) => UpdateUser(data, user?.id), {
    onSuccess: () => {
      queryClient.invalidateQueries([`user`]);
    },
  });

  const handleUpdate = async (newItem : AddUserBody) => {
    updateMutation.mutate(newItem);
  };

  return (
    <div>
      <div className="border-b border-b-yellow4 py-2 mb-2 capitalize">
        <p className="text-yellow1 text-2xl font-semibold">Edit your details</p>
      </div>
      <Formik
        initialValues={{
          ...user,
        }}
        onSubmit={(values) => {
         values.public_id = files?.[0]
          handleUpdate(values);
          console.log(values)
          setOpen(false);
        }}>
        <Form>
          <div className="flex flex-col w-full gap-5 items-start justify-center">
            <div className="w-full flex items-start justify-center flex-col gap-5">
              {user?.public_id && !files && (
                <div className="relative w-full rounded-lg h-[400px]  overflow-hidden border-2 ">
                  <Image
                    src={`https://res.cloudinary.com/daurieb51/image/upload/v1642082142/${user?.public_id}.png`}
                    fill
                    alt="USer"
                    objectFit="cover"
                  />{" "}
                </div>
              )}
        
                <div className="w-full">
                  <AccountAddImage setFiles={setFiles}/>
                  {files && (
                    <div className="relative w-full rounded-lg h-[400px]  overflow-hidden border-2 ">
                      <Image
                        src={`https://res.cloudinary.com/daurieb51/image/upload/v1642082142/${files}.png`}
                        fill
                        alt="USer"
                        objectFit="cover"
                      />{" "}
                    </div>
                  )}
                </div>
            
            </div>

            <div className="grid grid-cols-2 gap-5 w-full">
              <div className="flex flex-col gap-5">
                <TextField
                  label="Username"
                  name="username"
                  placeholder="Enter username"
                />
                <TextField
                  label="Phone"
                  name="phone_number"
                  placeholder="Enter phone"
                />
                <TextField
                  label="Country"
                  name="country"
                  placeholder="Enter country"
                />
              </div>
              <div className="flex flex-col gap-5 ">
                <TextField
                  label="email address"
                  name="email"
                  placeholder="Enter email address"
                />
                <TextField
                  label="contact address"
                  name="contact_address"
                  placeholder="Enter contact address"
                />

                {/* <TextField
                  label="address2"
                  name="addres2"
                  placeholder="Enter address2"
                /> */}
              </div>
            </div>

            <div className="flex gap-5 w-full justify-end pt-5 border-t border-t-yellow4">
              <button
                className="bg-yellow4 px-6 py-2 rounded-md w-full max-w-[120px] font-semibold text-sm"
                onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                className="bg-yellow1  px-6 py-2 rounded-md max-w-[120px] w-full text-white font-semibold text-sm"
                type="submit">
                Edit
              </button>{" "}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default EditProfileModalRoot;
