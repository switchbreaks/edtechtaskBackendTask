const successResponse = (res, message, statusCode = 200, data) => {
    return res.status(statusCode).json({
        status: true,
        message,
        data,
    });
};

const errorResponse = (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
        status: false,
        message,
    });
};

module.exports = {
    successResponse,
    errorResponse,
};