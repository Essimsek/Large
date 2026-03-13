/**
 * Phase 1 Migration Script
 *
 * Run with: node --env-file=.env node_modules/.bin/tsx scripts/migrate-phase1.ts
 *
 * 1. Converts all author `id` fields from number to string
 * 2. Sets `status: "published"` on all existing posts
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "next-sanity";

// Load .env file since we're running outside Next.js
const envPath = resolve(process.cwd(), ".env.local");
try {
    const envFile = readFileSync(envPath, "utf-8");
    for (const line of envFile.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIndex = trimmed.indexOf("=");
        if (eqIndex === -1) continue;
        const key = trimmed.slice(0, eqIndex).trim();
        const value = trimmed.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) process.env[key] = value;
    }
} catch {
    // Try .env if .env.local doesn't exist
    try {
        const envFile = readFileSync(resolve(process.cwd(), ".env"), "utf-8");
        for (const line of envFile.split("\n")) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("#")) continue;
            const eqIndex = trimmed.indexOf("=");
            if (eqIndex === -1) continue;
            const key = trimmed.slice(0, eqIndex).trim();
            const value = trimmed.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, "");
            if (!process.env[key]) process.env[key] = value;
        }
    } catch {
        console.error("No .env.local or .env file found. Set env vars manually.");
        process.exit(1);
    }
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: "2025-06-18",
    useCdn: false,
    token: process.env.SANITY_API_KEY!,
});

async function migrateAuthorIds() {
    const authors = await client.fetch<{ _id: string; id: number | string }[]>(
        `*[_type == "author"]{ _id, id }`
    );

    let patched = 0;
    for (const author of authors) {
        if (typeof author.id === "number") {
            await client.patch(author._id).set({ id: String(author.id) }).commit();
            patched++;
            console.log(`Converted author ${author._id} id: ${author.id} → "${String(author.id)}"`);
        }
    }
    console.log(`Author migration complete: ${patched}/${authors.length} patched.`);
}

async function migratePostStatus() {
    const posts = await client.fetch<{ _id: string; status?: string }[]>(
        `*[_type == "post"]{ _id, status }`
    );

    let patched = 0;
    for (const post of posts) {
        if (!post.status) {
            await client.patch(post._id).set({ status: "published" }).commit();
            patched++;
            console.log(`Set status "published" on post ${post._id}`);
        }
    }
    console.log(`Post migration complete: ${patched}/${posts.length} patched.`);
}

async function main() {
    console.log("Starting Phase 1 migrations...\n");

    console.log("--- Migrating author IDs (number → string) ---");
    await migrateAuthorIds();

    console.log("\n--- Migrating post status (undefined → published) ---");
    await migratePostStatus();

    console.log("\nAll migrations complete.");
}

main().catch(console.error);
