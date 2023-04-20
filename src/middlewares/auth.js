export function isAuthenticated(req, res, next) {
    if (req.session.user) next();
    else res.status(401).json({ message: "Requires authentication" });
}
