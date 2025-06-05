import { LogOutIcon } from "lucide-react";
import SignOutAction from "./sign-out-action";
 
export default function SignOut() {
  return (
    <span onClick={SignOutAction}>Log out <LogOutIcon /> </span>
  )
};