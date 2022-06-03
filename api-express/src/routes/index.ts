import { prisma } from "../prisma"
import { asyncHandler } from "../utils/server"

import {
    Router as createRouter,
    Request,
    Response,
} from "express"

const router = createRouter()

router.get("/", (req: Request, res: Response) => {
    res.json({
        ok: true,
    })
})

router.get("/async", asyncHandler(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany()
    res.json({
        ok: true,
        users,
    })
}))


export default router
