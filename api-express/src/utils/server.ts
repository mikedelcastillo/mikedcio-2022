import {
    NextFunction,
    Request,
    Response,
} from "express"

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const asyncHandler = (handler: AsyncHandler) => 
    (req: Request, res: Response, next: NextFunction) => 
        handler(req, res, next).catch(next)

export const createServerErrorHandler =
    (port: string | number | boolean) => (error: NodeJS.ErrnoException) => {
        if (error.syscall !== "listen") {
            throw error
        }

        const bind = typeof port === "string" ?
            "Pipe " + port :
            "Port " + port

        // handle specific listen errors with friendly messages
        switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges")
            process.exit(1)
            break
        case "EADDRINUSE":
            console.error(bind + " is already in use")
            process.exit(1)
            break
        default:
            throw error
        }
    }

export const normalizePort = (val: string) => {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
    // named pipe
        return val
    }

    if (port >= 0) {
    // port number
        return port
    }

    return false
}
