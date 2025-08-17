"use server";
import { client } from "./client"

export async function checkExistingUsername(username: string) {

  let count = 0
  let existingUser = await client.withConfig({useCdn: false}).fetch(
    `*[_type == "author" && username == $username][0]`, 
    { username }
  )

  while (existingUser) {
    console.log(`Username ${username} already exists, trying with a number suffix...`)
    count++
    username = `${username}${count}`
    existingUser = await client.withConfig({useCdn: false}).fetch(
      `*[_type == "author" && username == $username][0]`, 
      { username }
    )
  }
  return username
}


export default async function sanityUpdateUsername({ username, userId }: { username: string, userId: string }) {
  try {
    const usernameExists = await client.fetch(`*[_type == "author" && username == $username][0] {
      _id
    }`, { username });
    if (usernameExists) {
      throw new Error("");
    }
    await client.patch(userId).set({username: username}).commit();
    return false;
  } catch (error) {
    return true;
  }
}
