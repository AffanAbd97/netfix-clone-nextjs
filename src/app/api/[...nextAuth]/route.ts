import { RequestInternal, Awaitable, User } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { compare } from 'bcrypt'
import { debug } from "console";
export default NextAuth({
    providers:[
        Credentials({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                }, password: {
                    label: 'Password',
                    type: 'password'
                },
            },
            async authorize(credentials) {
                if (!credentials?.email||!credentials?.password) {
                    throw new Error('Email and Password required')
                }

                const user = await db.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                })

                if(!user||!user.hashedPassword){
                    throw new Error('Email not exist')
                }
                const isCorrectPassword = await compare(
                    credentials.password,user.hashedPassword
                )
                if (!isCorrectPassword) {
                    throw new Error('incorrect Password')
                }
                return user
            },
        })
    ],
    pages:{
        signIn:'/auth',
    },
    debug :process.env.NODE_ENV=='development',
    session:{
        strategy:'jwt'
    },
    jwt:{
        secret:process.env.NEXT_AUTH_JWT
    },
    secret:
        process.env.NEXT_AUTH_SECRET
    
})
