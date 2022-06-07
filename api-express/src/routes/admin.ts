import { prisma } from "../prisma"
import { asyncHandler, validateMiddleware } from "../utils/server"
import { messageUser } from "../utils/messaging"
import createError from "http-errors"
import { v4 as uuid4 } from "uuid" 
import bcrypt from "bcrypt"
import { body, query } from "express-validator"
import {
    Router as createRouter,
    Request,
    Response,
    RequestHandler,
    NextFunction,
} from "express"

const CODE_POOL = "01234567890ABCDEF"
const REQUEST_FREQUENCY_LIMIT = 1000 * 60 * 10 // 10 minutes
const LOGIN_EXPIRY_LENGTH = 1000 * 60 * 60 * 1 // 1 hour
const CODE_EXPIRY_LENGTH = REQUEST_FREQUENCY_LIMIT

const router = createRouter()

const authMiddleware: RequestHandler = asyncHandler(async (req, res, next) => {
    if(typeof req.headers.authorization === "string"){
        const id: string = req.headers.authorization

        const loginRequest = await prisma.loginRequest.findFirst({
            where: {
                id,
                loginExpiryDate: {
                    "gt": new Date(),
                },
                valid: true,
                success: true,
                user: {
                    disabled: false,
                },
            },
        })

        if(loginRequest === null){
            return next(createError(401, "Token invalid"))
        }
        
        res.locals.loginRequest = loginRequest
        res.locals.user = await prisma.user.findFirst({
            where: {
                id: loginRequest.userId,
            },
        })
        
        next()
    } else{
        return next(createError(401, "Token missing"))
    }
})

router.get("/verify", authMiddleware, (req: Request, res: Response) => {
    const user = res.locals.user

    res.json({
        ok: true,
        user,
    })
})

router.post("/request", validateMiddleware([
    body("email").isEmail().notEmpty(),
]), asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    // Find user
    const user = await prisma.user.findFirst({
        where: {
            email,
            disabled: false,
        },
    })

    // Find if has login request recently
    const lastLoginRequest = await prisma.loginRequest.findFirst({
        where: {
            userId: user.id,
            success: false,
            requestDate: {
                "gt": new Date(Date.now() - REQUEST_FREQUENCY_LIMIT)
            },
            valid: true,
        },
        orderBy: {
            requestDate: "desc",
        },
    })
    if(lastLoginRequest){
        next(createError(400, "Login request too frequent"))
        return
    }

    // Create login request
    const code = Array(8).fill("")
        .map(() => CODE_POOL[Math.floor(Math.random() * CODE_POOL.length)]).join("")
    const hashedCode = await bcrypt.hash(code, 16)

    const loginRequestData = {
        id: uuid4(),
        userId: user.id,
        code: hashedCode,
        codeExpiryDate: new Date(Date.now() + CODE_EXPIRY_LENGTH),
        ip: String(req.headers["x-forwarded-for"] || req.socket.remoteAddress),
        userAgent: req.headers["user-agent"],
        loginExpiryDate: new Date(Date.now() + LOGIN_EXPIRY_LENGTH),
        valid: true,
    }

    await prisma.loginRequest.create({
        data: loginRequestData,
    })

    // Send the message
    const subject = "Login Request"
    const flagUrl = `${process.env.API_URL}/api/admin/flag?token=${loginRequestData.id}`
    const message: string = [
        `Code: ${code}`,
        `There was a login attempt from IP <${loginRequestData.ip}> with user agent <${loginRequestData.userAgent}>`,
        `View IP location: https://tools.keycdn.com/geo?host=${loginRequestData.ip}`,
        `If this was not you, click this link: ${flagUrl}`,
    ].join("\n")
    await messageUser(user, subject, message)

    res.json({
        ok: true,
        token: loginRequestData.id,
    })
}))

router.post("/login", validateMiddleware([
    body("token").isString().notEmpty(),
    body("code").isString().notEmpty(),
]), asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const loginRequestId = req.body.token
    const code = req.body.code
    
    // Find login request
    const loginRequest = await prisma.loginRequest.findFirst({
        where: {
            id: loginRequestId,
            success: false,
            codeExpiryDate: {
                "gt": new Date()
            },
            valid: true,
        },
    })

    if(loginRequest === null){
        next(createError(404, "Login request not found"))
        return
    }

    // Check if code is correct
    const result = await bcrypt.compare(code, loginRequest.code)

    if(result === false){
        next(createError(401, "Code is incorrect"))
        return
    }

    // Update login request
    await prisma.loginRequest.update({
        where: {
            id: loginRequest.id,
        },
        data: {
            valid: true,
            success: true,
            successDate: new Date(),
        },
    })

    res.json({
        ok: true,
    })
}))

router.get("/flag", validateMiddleware([
    query("token").isString().notEmpty(),
]), asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const loginRequestId = req.query.token as string

    // Check if login request exists
    const loginRequest = await prisma.loginRequest.findFirst({
        where: {
            id: loginRequestId,
            valid: true,
        },
    })

    if(loginRequest === null){
        next(createError(404, "Login request not found"))
        return
    }
    
    // Invalidate requst
    await prisma.loginRequest.update({
        where: {
            id: loginRequest.id,
        },
        data: {
            valid: false,
        },
    })

    res.json({
        ok: true,
    })
}))

export default router
