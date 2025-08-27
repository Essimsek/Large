
import { client } from "./client";

async function createNewPost({data}: {data: FormData}) {
    const title = data.get('post-title') as string
    const description = data.get('post-description') as string
    const thumbnail = data.get('post-thumbnail') as File
    try {
        if (thumbnail) {
            const imageAsset = await client.assets.upload("image", thumbnail, {
                filename: thumbnail.name,
            });
        }
        console.log("Creating new post with title:", title, "description:", description, "thumbnail:", thumbnail);
        //await client.create({ _type: "post", title, description, image: thumbnail })
    } catch (error) {
        console.error("Error creating new post:", error); 
    }
}
export { createNewPost };
