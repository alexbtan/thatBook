import { connectToDB } from "@utils/database"
import User from '@models/user'
import { stringify } from "postcss";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const user = await User.find({_id: params.id}).populate('_id');

        return new Response(JSON.stringify(user), { status: 200})
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500})
    }
}