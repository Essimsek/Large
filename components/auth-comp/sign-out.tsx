import { LogOutIcon } from "lucide-react";
import SignOutAction from "./sign-out-action";
 
export default function SignOut() {
  return (
    <div onClick={SignOutAction} className="flex flex-row justify-between w-full h-full">
      <span>Log out</span>
      <LogOutIcon />
    </div>
  )
};
