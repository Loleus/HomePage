class ValidationError extends Error {
}

class NotFoundError extends Error {
}

function handleError(err, req, res, next) {
    if (err instanceof NotFoundError) {
        res
            .status(404)
            // .render('errors/error', {
            //     message: 'Nie można znaleźć klienta o danym ID.',
            // });
            return;
    }

    res.status(err instanceof ValidationError ? 400 : 500);

    // res.render('errors/error', {
    //     message: err instanceof ValidationError ? err.message : 'Przepraszamy, spróbuj ponownie za jakiś czas.',
    // })
}

module.exports = {
    handleError,
    ValidationError,
    NotFoundError,
}