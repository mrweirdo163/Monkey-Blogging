import React, { useEffect } from "react";
import { Button } from "components/button";
import { Field } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useForm } from "react-hook-form";
import { useFirebaseImage } from "hooks/useFirebaseImage";
import { db } from "firebase-app/firebase-config";
import { toast } from "react-toastify";
import slugify from "slugify";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { updateProfile, updatePassword } from "firebase/auth";
import { useAuth } from "contexts/auth-context";
import InputPasswordToggle from "components/input/InputPasswordToggle";

const UserProfile = () => {
  const { userInfo } = useAuth();
  const currURL = userInfo?.photoURL;

  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { isValid, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const {
    image,
    progress,
    handleSelectImage,
    handleRemoveImage,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues);

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "users", userInfo.uid);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
    }
    fetchData();
  }, [reset, userInfo.uid]);

  const handleUpdateProfile = async (values) => {
    if (!isValid) return;
    console.log(values);
    try {
      await updateProfile(userInfo, {
        displayName: values.fullname,
        photoURL: image || currURL,
      });
      if (values.password) {
        await updatePassword(userInfo, values.password);
      }

      await setDoc(doc(db, "users", userInfo.uid), {
        fullname: values.fullname,
        email: values.email || userInfo.email,
        password: values.password,
        username: slugify(values.username || values.fullname, { lower: true }),
        photoURL: userInfo.photoURL || currURL,
        createdAt: serverTimestamp(),
      });
      handleResetUpload();
      toast.success("Update profile successfully!");
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Date of Birth</Label>
            <Input
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <InputPasswordToggle control={control}></InputPasswordToggle>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Avatar</Label>
            <ImageUpload
              onChange={handleSelectImage}
              handleRemoveImage={handleRemoveImage}
              className="h-[300px] shadow-lg"
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
        </div>

        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
