'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from "next/navigation";

import Form from '@components/Form';

const CreatePrompt = () => {
    const searchParams = useSearchParams();
    const bookId = searchParams.get('id');
    const router = useRouter();
    const { data:session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/prompt/new', 
            {
                method: 'POST',
                body: JSON.stringify({
                    title: bookId,
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })

            if(response.ok) {
                router.push('/');
            }
        }
        catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false);
        }
        
    }

  return (
    <Form
        type="Create"
        post={post}
        bookId={bookId}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}

    />
  )
}

export default CreatePrompt