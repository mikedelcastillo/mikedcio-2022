import {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express"
import { ValidationChain, ValidationError } from "express-validator"
import { ResultWithContext } from "express-validator/src/chain"
import createHttpError from "http-errors"

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const asyncHandler = (handler: AsyncHandler) => 
    (req: Request, res: Response, next: NextFunction) => 
        handler(req, res, next).catch(next)

export const validateMiddleware = (validations: ValidationChain[]):RequestHandler => {
    return asyncHandler(async (req, res, next) => {
        let errors: ValidationError[] = []
        for(const validation of validations){
            const results: ResultWithContext = await validation.run(req)
            if(results.context.errors.length){
                errors = errors.concat(results.context.errors)
            }
        }
        if(errors.length){
            const message = Array.from(new Set(errors.map(error => `${error.location}:${error.param} = ${error.value} (${error.msg})`))).join("; ")
            next(createHttpError(422, message))
        } else{
            next()
        }
    })
}

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
