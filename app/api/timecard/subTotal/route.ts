import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismaClient"

export async function PUT (req:NextRequest, res:NextResponse) {
    
    try {

        const {userId,formattedTime} = await req.json()
        
        console.log(userId,formattedTime)

        //当月データの総合計を取得する記述を追加してみる/2024年4月1日記述再開
        const today = new Date()
        const monthStart = new Date(today.getFullYear(),today.getMonth(),1)
        const monthEnd = new Date(today.getFullYear(),today.getMonth() + 1, 0)
        console.log(monthStart,monthEnd)

        const subTotal = await prisma.timecard.update({
            where : {
                id : userId,
            },
            data : {
                subTotal : formattedTime
            },
        })
        console.log(subTotal)
        return NextResponse.json({subTotal})

    } catch (error) {
        console.log(error)
        return new NextResponse('エラーです',{status:500})
    }

}