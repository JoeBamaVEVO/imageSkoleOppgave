/* eslint-disable react/no-unescaped-entities */
'use client'

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function RegisterForm(){
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // Make sure email is entered as case insensitive
        let email = formData.get('email') as string;
        const lowerCaseEmail = email.toLowerCase();

        const response = await signIn('credentials', {
            email: lowerCaseEmail as string,
            password: formData.get('password') as string,
            redirect: false
        });
        console.log({response});
        if(!response?.error){
            router.push('/');
            router.refresh();
        } 
    }   
    return (
        <div className="flex flex-col text-center">
            <h1 className="text-2xl m-5">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col text-center self-center gap-3 mt-2 ">
                <input name="email" type="text" placeholder="Email" className="border border-black rounded p-1"/>
                <input name="password" type="text" placeholder="Password" className="border border-black rounded p-1"/>
                <button 
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Login
                </button>
                <p>Don't have a user? Register <Link href="/register" className='text-sky-900'>here</Link></p>
            </form>
        </div>
    );
};