"use server";
import { client } from './client'; // Adjust the import path as necessary
import {signIn} from '@/auth';

export const updateUsername = async (id: string, newUsername: string) => {
    try {
        const isUser = await client.fetch(`*[_type == "author" && username == $newUsername][0]`, { newUsername });
        if (isUser) {
            throw new Error("Username already exists");
        }
        const response = await client.patch(id).set({ username: newUsername }).commit();
        await signIn("github", { redirect: false });
        return true;
    } catch (error) {
        console.error("Error updating username:", error);
        return false;
    }
} 