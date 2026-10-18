export function mongoInternalError(err, req, res) {
    console.log(err)
    return res.status(500).json({ message: "Internal Mongo error" });
}

export function invalidEndpoint(req, res) {
    return res.status(404).json({ message: "Unavailable endpoint" });
}

export function invalidToken(req, res) {
    return res.status(401).json({ message: "Invalid token" });
}

export function expiredToken(req, res) {
    return res.status(401).json({ message: "Expired token" });
}

export function tokenNotProvided(req, res) {
    return res.status(400).json({ message: "Token not provided" });
}

export function fieldValidationError(req, res) {
    return res.status(400).json({ message: res.validationMessage });
}

export function defaultError(req, res) {
    console.log(err)
    return res.status(500).json({ message: "Internal API error" });
}