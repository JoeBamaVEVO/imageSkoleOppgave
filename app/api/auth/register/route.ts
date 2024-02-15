import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import Database from 'better-sqlite3';
require('dotenv').config();


export async function POST(req: Request){
    try {
        const { fname, lname, dob, email, username, password } = await req.json();
        //validate email and password
        //making sure email and username are lowercase
        const lowercaseEmail = email.toLowerCase();
        const lowercaseUsername = username.toLowerCase();
        
        console.log({fname, lname, dob, email, username, password});
        if (!fname || !lname || !dob || !email || !username || !password) {
            return NextResponse.json({message: "Please fill in all fields"});
        }
        const hashedPassword = await hash(password, 10);

        const db = new Database('database.db', { verbose: console.log });
        const stmt = db.prepare('INSERT INTO user (fornavn, etternavn, fdato, epost, brukernavn, passord) VALUES (?, ?, ?, ?, ?, ?)');
        const info = stmt.run(fname, lname, dob, lowercaseEmail, lowercaseUsername, hashedPassword);
    } catch (error) {
        console.log(error);
    }

    return NextResponse.json({message: "User registered"});
}