"use server";
import { client } from "./client"


export default async function sanityUpdateUsername({ username, userId }: { username: string, userId: string }) {
  try {
    await client.patch(userId).set({username: username}).commit();
  } catch (error) {
    console.log("Error updating username:", error);
  }
}
