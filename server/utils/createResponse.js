
exports.createResponse = (statusCode, message, data = null) => {
    return {
        statusCode,
        body: JSON.stringify({
            message,
            data,
        }),
    };
}