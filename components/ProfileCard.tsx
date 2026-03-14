"use client";
import { Author } from '@/sanity.types';
import { formatDate } from '@/lib/utils';
import Header from '@/components/Header';
import { Button } from './ui/button';
import { Edit, Save, X, CalendarDays, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import Image from 'next/image';
import sanityUpdateUsername  from '@/sanity/lib/update-username';
import { urlForImage } from '@/sanity/lib/image';

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
            <div className="relative w-40 h-40 md:w-48 md:h-48">
                <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm" />
                <Image
                    src={urlForImage(user.image).width(192).height(192).url() || '/fallback-profile.png'}
                    alt={`${user.name}'s avatar`}
                    sizes="(max-width: 768px) 160px, 192px"
                    fill
                    className="object-cover rounded-full border-4 border-white/90 shadow-xl relative"
                />
            </div>

            <div className="text-center mt-6 space-y-3">
                <div className="flex flex-row items-center justify-center space-x-2">
                {isOwner && isEditing ? (
                    <>
                        <Input className="text-2xl text-white py-7 text-center font-semibold md:text-3xl lg:text-4xl bg-black/50 border-white/30 rounded-xl backdrop-blur-sm"
                                onChange={(e) => setUsername(e.target.value)}
                                value={isError ? user.username : username}
                        />
                        <Button onClick={() => {handleSave()}} className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"><Save /></Button>
                        { isLoading && <span className="text-white animate-pulse">Saving...</span>}
                        <Button onClick={() => setIsEditing(false)} className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"><X /></Button>
                        {isError == true && <span className="text-yellow-300 font-medium">Username already exists!</span>}
                    </>
                ): (
                    <>
                        <Header title={user.username || 'no name'} />
                        {isOwner && <Button onClick={() => setIsEditing(true)} className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"><Edit size={16} /></Button>}
                    </>
                )}
                </div>
                <p className="text-white/90 font-medium max-w-md mx-auto leading-relaxed">
                {user.bio || 'This user has not set up their profile yet.'}
                </p>
            </div>

            <div className="mt-6 flex gap-6 text-sm text-white/70">
                <div className="flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    <span>Joined {formatDate(user._createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <RefreshCw size={14} />
                    <span>Updated {formatDate(user._updatedAt)}</span>
                </div>
            </div>
        </div>
  );
}

export default ProfileCard;
