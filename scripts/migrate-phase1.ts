/**
 * Phase 1 Migration Script
 *
 * Run with: npx tsx scripts/migrate-phase1.ts
 *
 * 1. Converts all author `id` fields from number to string
 * 2. Sets `status: "published"` on all existing posts
 */

import { createClient } from "next-sanity";

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
