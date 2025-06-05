"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

const SignOutAction = async () => {
        await signOut();
        redirect("/");
};

export default SignOutAction;
