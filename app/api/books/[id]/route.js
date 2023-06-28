import { connectToDB } from "@utils/database"
import Prompt from '@models/prompt'
import { stringify } from "postcss";

export const GET = async (request, { params }) => {
    try {
        console.log(params.id);
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${params.id}`);
        const data = await response.json();
        console.log(data);
        return new Response(JSON.stringify(data), { status: 200})
    } catch (error) {
        return new Response("Failed to fetch books", { status: 500})
    }
}