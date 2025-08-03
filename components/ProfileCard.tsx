"use client";
import { Author } from '@/sanity.types';
import { formatDate } from '@/lib/utils';
import Header from '@/components/Header';
import { Button } from './ui/button';
import { Edit, Save, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import Image from 'next/image';
import sanityUpdateUsername  from '@/sanity/lib/update-username';

const USERNAME_SCHEMA = z
  .string()
  .min(1, "minimum 1 character required")
  .max(39, "maximum 39 characters allowed")
  .regex(/^(?!-)(?!.*--)[A-Za-z0-9-]{1,39}(?<!-)$/, "Username must be alphanumeric or hyphen, cannot start or end with hyphen, and cannot contain consecutive hyphens");

const ProfileCard = ({user, isOwner}: {user: Author, isOwner: boolean}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(user.username || '');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSave = async () => {
        const parsedUsername = USERNAME_SCHEMA.safeParse(username);
        if (!parsedUsername.success) {
            alert("Username must be alphanumeric or hyphen, cannot start or end with hyphen, and cannot contain consecutive hyphens");
            return;
        } else {
                setIsLoading(true);
                const err = await sanityUpdateUsername({username: username, userId: user._id});
                if (err !== true) {
                    await signIn("github", {redirect: false});
                    window.location.href = `/${username}`;
                    setIsEditing(false);
                    setIsError(false);
                }
                else {
                    setIsError(true);
                }
            }
            setIsLoading(false);
        }

    return (
        <div className="red-container pattern">
            <div className="relative w-48 h-48">
                <Image
                    src={user.image || '/fallback-profile.png'}
                    alt={`${user.name}'s avatar`}
                    sizes="(max-width: 768px) 100vw, 200px"
                    fill
                    className="object-cover rounded-full border-4 border-white"
                />
            </div>

            <div className="text-center mt-6 space-y-2">
                <div className="flex flex-row items-center justify-center space-x-2">
                {isOwner && isEditing ? (
                    <>
                        <Input className="text-2xl text-white py-7 text-center font-semibold md:text-3xl lg:text-4xl bg-black" 
                                onChange={(e) => setUsername(e.target.value)}
                                value={isError ? user.username : username} 
                        />
                        <Button onClick={() => {handleSave()}}><Save /></Button>
                        { isLoading && <span className="text-white">Saving...</span>}
                        <Button onClick={() => setIsEditing(false)}><X /></Button>
                        {isError == true && <span className="text-red-500">Username already exists!</span>}
                    </>
                ): (
                    <>
                        <Header title={user.username || 'no name'} />
                        {isOwner && <Button onClick={() => setIsEditing(true)}><Edit /></Button>}
                    </>
                )}
                </div>
                <p className="text-white font-medium">
                {user.bio || 'This user has not set up their profile yet.'}
                </p>
            </div>

            <div className="mt-4 text-sm text-white/80 text-center">
                <p>Joined: {formatDate(user._createdAt)}</p>
                <p>Last update: {formatDate(user._updatedAt)}</p>
            </div>
        </div>
  );
}

export default ProfileCard;