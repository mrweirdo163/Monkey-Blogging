import React, { useEffect } from "react";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
import { Field } from "../components/field";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import slugify from "slugify";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Your email is not valid!")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values) => {
    if (!isValid) return;
    console.log(values);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(auth.currentUser, {
        displayName: values.fullname,
      });
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.fullname, { lower: true }),
        createdAt: serverTimestamp(),
      });
      toast.success("Sign up successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Email already in use, please use another email!");
    }
  };

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message);
    }
  }, [errors]);

  useEffect(() => {
    document.title = "Register Page";
  }, []);

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="fullname" className="label">
            Fullname
          </Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Enter your fullname"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="email" className="label">
            Email address
          </Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password" className="label">
            Password
          </Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <Button
          className="mx-auto w-[200px]"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
        <div className="have-account">
          Already a member? <NavLink to={"/sign-in"}>Login</NavLink>
        </div>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
