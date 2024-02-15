'use client'
import { signOut } from "next-auth/react";

export default function LogoutBtn(){
    return (
          <span 
                className="text-2xl hover:scale-105"
                onClick={()=>{
                    signOut();
                }}
                >
                    Logout
            </span>
    );
};