import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import Database from "better-sqlite3";

interface User {
    fornavn: string 
    etternavn: string
    fdato: string
    epost:  string
    brukernavn: string
    passord: string
  }
  
  let user: User; // This declares a 'user' variable with the type 'User'

// async function getUserByEmail(email: string) {
//     const db = mysql.createConnection({
//         host: process.env.host,
//         user: process.env.user,
//         password: process.env.pass,
//         database: process.env.db,
//         ssl: {
//         }
//     });
//     return new Promise((resolve, reject) => {
//         db.query("SELECT * FROM `users` WHERE `email` = ?", [email], function (err, results: any) {
//             if (err) {
//                 console.log(err);
//                 reject(err);
//             } else {
//                 console.log("results[0]");
//                 console.log(results[0]);
//                 resolve(results[0]);
//             }
//         });
//     });
// }

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req): Promise<any> {
                console.log(credentials);
                async function getUser(credentials: any) {
                    try{
                        const db = new Database('database.db', { verbose: console.log });
                        const stmt = db.prepare('SELECT * FROM user WHERE epost = ?');
                        const result = stmt.get(credentials?.email);
                        return result;
                    } 
                    catch (error) {
                        console.log(error);
                        return null;
                    }
                
                }
                const user: any = await getUser(credentials);
                console.log(user);
                // Checks if the user exists
                // Checks if the password is correct
                const isValid = await compare(credentials?.password || "", user.passord);
                console.log(isValid);
                if (isValid) {
                    return {
                        // id: user.idusers,
                        // email: user.email,
                    }
                }
                return null;   
            }
        })
    ]
});

export { handler as GET, handler as POST}