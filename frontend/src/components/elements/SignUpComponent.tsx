"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { toast, Toaster } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export function SignupFormDemo() {
  const navigate = useNavigate();
  const [f_name, setFName] = React.useState("");
  const [l_name, setLName] = React.useState("");
  const [email_user, setEmailUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [confirm_pass, setConfirmPass] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(f_name, l_name, email_user, pass, confirm_pass);
    if (f_name.trim() === "") {
      toast.error("First name is required");
      return;
    }
    if (email_user.trim() === "") {
      toast.error("Email is required");
      return;
    }
    if (pass.trim() === "") {
      toast.error("Password is required");
      return;
    }
    if (confirm_pass.trim() === "") {
      toast.error("Confirm password is required");
      return;
    }
    if (pass !== confirm_pass) {
      toast.error("Passwords do not match");
      return;
    }
    const name = f_name + " " + l_name;

    axios
      .post("http://127.0.0.1:8000/auth/signup", {
        email: email_user,
        password: pass,
        username: name,
      })
      .then(() => {
        toast.success("Form submitted");
        setTimeout(() => {
          console.log("hello");
          navigate("/homepage");
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.detail);
      });
  };

  const AfterSignup = (email: string) => {
    axios
      .post("http://127.0.0.1:8000/auth/signup", {
        email: email,
        password: "Test@123",
        username: "user",
      })
      .then(() => {
        // toast.success("Sign-in success");
        toast.info("Sign-in success Password is Test@123");
        setTimeout(() => {
          navigate("/homepage");
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.detail);
      });
  };

  return (
    <div
      className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black"
    >
      <h2 className="font-bold text-xl text-neutral-200">
        WELCOME TO SCHOLARSAFE
      </h2>
      {/* <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p> */}

      <form
        className="my-8"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form submitted");
          // navigate("/dashboard");
        }}
      >
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              onChange={(e) => setFName(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              onChange={(e) => setLName(e.target.value)}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@iiitl.ac.in"
            type="email"
            onChange={(e) => setEmailUser(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            onChange={(e) => setPass(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmPassword">Enter Confirm Passsword</Label>
          <Input
            id="confirmPassword"
            placeholder="••••••••"
            type="password"
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block  w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          onClick={handleSubmit}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-300" />
            <span className="text-neutral-300 text-sm">GitHub</span>
            <BottomGradient />
          </button>
          <button className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)] z-10">
            <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
            <span className="text-neutral-300 text-sm z-10">Google</span>
            <span className="absolute inset-0 z-0 opacity-0 w-full h-full">
              <GoogleLogin
                onSuccess={(response) => {
                  const credential = response.credential;
                  if (credential) {
                    const decoded = JSON.parse(atob(credential.split(".")[1]));
                    const email = decoded.email;
                    console.log("Email used:", email);
                    AfterSignup(email);
                  } else {
                    console.log("Credential is undefined");
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            {/* <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" /> */}
            <span className="text-neutral-300 text-sm">Mail</span>
            <BottomGradient />
          </button>
        </div>
      </form>
      <Toaster richColors />
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
