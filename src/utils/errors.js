class ValidationError extends Error {
};

class NotFoundError extends Error {
};

function handleError(err, req, res, next) {
    if (err instanceof NotFoundError) {
        res
            .status(404)
            .send('Not Found')
        return;
    }
    res.status(err instanceof ValidationError ? 400 : 500)
        .send(err instanceof ValidationError ? err.message : 'Przepraszamy, spróbuj ponownie za jakiś czas.',
        )
};

module.exports = {
    handleError,
    ValidationError,
    NotFoundError,
};