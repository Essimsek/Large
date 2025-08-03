"use server";
import { client } from "./client"

export default async function sanityUpdateUsername({ username, userId }: { username: string, userId: string }) {
  try {
    const usernameExists = await client.fetch(`*[_type == "author" && username == $username][0] {
      _id
    }`, { username });
    if (usernameExists) {
      return true;
    }
    await client.patch(userId).set({username: username}).commit();
    return false;
  } catch (error) {
    return true;
  }
}
