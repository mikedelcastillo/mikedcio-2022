import {
    Router as createRouter,
    Request,
    Response,
    NextFunction,
} from "express"

const router = createRouter()

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({
        ok: true,
    })
})

export default router
