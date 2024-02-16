import { getServerSession } from 'next-auth';
import LoginForm from './components/LoginForm';
import { redirect } from 'next/navigation';

export default async function page(){
    const session = await getServerSession();
    if (session) {        
        redirect("/")
    }
    return (
        <div className="flex flex-col text-center">
            <LoginForm />
        </div>
    );
};