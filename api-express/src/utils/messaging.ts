import { User } from "@prisma/client"
import axios from "axios"

export const sendEmail = async (user: User, subject: string, message: string) => {
    if(process.env.NODE_ENV !== "production") {
        console.log([
            `User: ${user.name} <${user.email}>`,
            `Subject: ${subject}`,
            `Message; ${message}`,
        ].join("\n"))
    }
}

export const sendTelegramMessage = async (user: User, message: string) => {
    await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        params:{
            chat_id: user.telegramId,
            text: message,
        },
    })
}

export const messageUser = async (user: User, subject: string, message: string) => {
    await sendEmail(user, subject, message)
    await sendTelegramMessage(user, message)
}