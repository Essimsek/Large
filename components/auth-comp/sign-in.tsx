import { signIn } from "@/auth"
import Icon from "../Icon"
import { Button } from "../ui/button"

export default function SignIn() {
  return (
    <div className="flex gap-2">
      <form
        action={async () => {
          "use server"
          await signIn("github")
        }}
      >
        <Button variant="outline" type="submit">
          Signin with<Icon iconPath="/icons/github-brands-solid.svg" width={20} height={20}/>
        </Button>
      </form>
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <Button variant="outline" type="submit">
          Signin with Google
        </Button>
      </form>
    </div>
  )
}
