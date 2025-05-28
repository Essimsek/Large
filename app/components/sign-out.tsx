import { signOut } from "@/auth"
import Icon from "./Icon";
import { redirect } from "next/navigation";
 
export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut();
        redirect("/");
      }}
    >
      <button className="flex flex-row gap-1" type="submit">
        Sign out 
        <Icon iconPath="./icons/sign-out-alt-solid.svg" width={20} height={20}/>
      </button>
    </form>
  )
};