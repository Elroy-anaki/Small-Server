const logger = (req, res, next) => {
    const date = new Date();
    console.log(req.method, req.url, date);
    next()
}

module.exports = {logger}