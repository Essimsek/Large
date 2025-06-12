import { signIn } from "@/auth"
import Icon from "../Icon"
import { Button } from "../ui/button"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <Button variant="outline" type="submit">
        Signin with<Icon iconPath="./icons/github-brands-solid.svg" width={20} height={20}/>
      </Button>
    </form>
  )
} 
