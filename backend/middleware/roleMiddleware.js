export const logger = (req, res, next)=>{
    console.log(`URL: ${req.url}\nMethod: ${req.method}\nDate: ${new Date()}`);
    next()
}

export const errorHandle = (err, req, res, next)=>{
    let statusCode = err.statusCode;
    res.status(statusCode).json({ message: err.message })
}
