"use server";

import { signOut } from "@/auth";

const SignOutAction = async () => {
        await signOut({ redirectTo: '/' });       
};

export default SignOutAction;
