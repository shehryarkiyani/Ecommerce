const AsyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch((error) => {
            if (!res.headersSent) { // Check if headers have been sent already
                res.status(500).json({ message: error.message });
            } else {
                // If headers already sent, pass the error to the error handling middleware
                next(error);
            }
        });
};
export default AsyncHandler