import Link from 'next/link';
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react';
import LogoutBtn from './LogoutBtn';


export default async function Navbar(){
    const session = await getServerSession();
    return (
        <div className='flex flex-row gap-10 justify-center items-center mb-5'>
            <Link className="text-2xl hover:scale-105" href="/">My Profile</Link>
            <Link className="text-2xl hover:scale-105" href="/create">Create</Link>
            <Link className="text-2xl hover:scale-105" href="/read">Homepage</Link>
            {!!session &&
                <LogoutBtn />
            }
            {!session &&
                <Link className="text-2xl hover:scale-105" href="/login">Login</Link>
            }        
        </div>
    );
};