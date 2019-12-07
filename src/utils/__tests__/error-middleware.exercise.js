// Testing Middleware

// 💣 remove this todo test (it's only here so you don't get an error about missing tests)

// 🐨 you'll need both of these:
import {buildRes, buildReq, buildNext} from 'utils/generate'
import {UnauthorizedError} from 'express-jwt'
import errorMiddleware from '../error-middleware'

// 💯 write a test object factory


// 🐨 Write a test for the UnauthorizedError case
test('responds with a 401 code for an express-jwt Unauthorized error', () => {
    const req = buildReq()
    const res = buildRes()
    const next = buildNext()
    const code = 'some_error_code'
    const message = 'Some message'
    const error = new UnauthorizedError(code, {message})
    errorMiddleware(error, req, res, next)

    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({
        code: error.code,
        message: error.message,
    })
    expect(res.json).toHaveBeenCalledTimes(1)

})


// 🐨 Write a test for the headersSent case
test('calls next if headersSent is true', () => {

    const req = buildReq()
    const res = buildRes({headersSent: true})
    const next = buildNext()
    const error = new Error('random error')

    errorMiddleware(error, req, res, next)

    expect(next).toBeCalledWith(error)
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()

})
// 🐨 Write a test for the else case (responds with a 500)
test('responds with a 500 and the error', () => {
    const req =buildReq()
    const res = buildRes()
    const error = new Error('some_error_code')
    const next = buildNext()

    errorMiddleware(error, req, res, next)

    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({
        message: error.message,
        stack: error.stack,
    })
    expect(res.json).toHaveBeenCalledTimes(1)
})