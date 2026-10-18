//MongoDB

export function mongoInternalError(err, req, res) {
    console.log(err)
    return res.status(500).json({ message: "Internal Mongo error" });
}

export function userNotFound(req, res) {
    return res.status(404).json({ message: "User not found" });
}

//Token

export function invalidToken(req, res) {
    return res.status(401).json({ message: "Invalid token" });
}

export function expiredToken(req, res) {
    return res.status(401).json({ message: "Expired token" });
}

export function tokenNotProvided(req, res) {
    return res.status(400).json({ message: "Token not provided" });
}

//Validation
export function fieldValidationError(req, res) {
    return res.status(400).json({ message: res.validationMessage });
}

export function invalidEndpoint(req, res) {
    return res.status(404).json({ message: "Unavailable endpoint" });
}

export function defaultError(err, req, res) {
    console.log(err)
    return res.status(500).json({ message: "Internal API error" });
}