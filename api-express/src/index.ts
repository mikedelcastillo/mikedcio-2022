import http from 'http'
import express, {
    Express,
    Request,
    Response,
    NextFunction,
    ErrorRequestHandler
} from 'express'
import cookieParser from 'cookie-parser'
import createError from 'http-errors'
import path from 'path'
import {
    createServerErrorHandler,
    normalizePort
} from './utils/server'

const app: Express = express()

// Set up express server
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

// Import routes
import indexRouter from './routes/index'

app.use('/', indexRouter)

// Catch 404
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404))
})

// Error handler
const handleError: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        ok: false
    })
}

app.use(handleError)

// Start server
const server = http.createServer(app)
const port = normalizePort(process.env.API_PORT || process.env.PORT || "3000")
server.listen(port)

// Add server listeners
server.on('error', createServerErrorHandler(port))
server.on('listening', () => {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on ' + bind);
})