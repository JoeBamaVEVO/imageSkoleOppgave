'use client'

import Link from "next/link";
import { FormEvent } from "react";

export default function RegisterForm(){
    const handleSubmit = async (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                fname: formData.get('fname') as string, 
                lname: formData.get('lname') as string,
                dob: formData.get('dob') as string,
                email: formData.get('email') as string,
                username: formData.get('username') as string,
                password: formData.get('password') as string
            })
        });
        console.log({response});
    }   
    return (
        <div className="flex flex-col text-center">
            <h1 className="text-2xl m-5">Register a user</h1>
            <form onSubmit={handleSubmit} className="flex flex-col text-center self-center gap-3 mt-2 ">
                <input name="fname" type="text" placeholder="First name" className="border border-black rounded p-1"/>
                <input name="lname" type="text" placeholder="Last name" className="border border-black rounded p-1"/>
                <input name="dob" type="date" placeholder="Date of Birth" className="border border-black rounded p-1"/>
                <input name="email" type="text" placeholder="Email" className="border border-black rounded p-1"/>
                <input name="username" type="text" placeholder="Username" className="border border-black rounded p-1"/>
                <input name="password" type="text" placeholder="Password" className="border border-black rounded p-1"/>
                <button 
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Register
                </button>
                <p>Already have a user? Login <Link href="/login" className='text-sky-900'>here</Link></p>
            </form>
        </div>
    );
};