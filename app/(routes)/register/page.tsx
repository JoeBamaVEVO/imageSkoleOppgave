import { redirect } from "next/navigation";
import RegisterForm from "./components/RegisterForm";
import { getServerSession } from "next-auth";

export default async function page(){
  const session = await getServerSession();
    if (session) {        
        redirect("/")
    }
    return (
        <div className="flex flex-col text-center">
          <RegisterForm />
        </div>
    );
};