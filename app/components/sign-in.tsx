import { signIn } from "@/auth"
import Icon from "./Icon"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button className="auth-button" type="submit">
        Signin with<Icon iconPath="./icons/github-brands-solid.svg" width={20} height={20}/>
      </button>
    </form>
  )
} 
