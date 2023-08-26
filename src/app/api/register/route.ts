

import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import db from '@/lib/db';
export  async function POST(req:Request) {

 
 
    try {
        const {name,email,password} = await req.json()
   
        
        const existEmail = await db.user.findUnique({
            where:{email}
        })
         
            
        if (existEmail) {
            console.log('email already taken');
            
            return NextResponse.json({
                message:'email already taken'
            },{status:422})
        }
        const hashedPassword = await bcrypt.hash(password,12)
        const user = await db.user.create({
            data:{
                email:email,
                name:name,
                hashedPassword:hashedPassword,
                image:'',
                emailVerified:new Date(),
            }
        })
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({message:error},{status:400})
    }
}