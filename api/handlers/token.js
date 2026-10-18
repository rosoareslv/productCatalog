export function invalidToken(req, res) {
    return res.status(401).json({ message: "Invalid token" });
}

export function expiredToken(req, res) {
    return res.status(401).json({ message: "Expired token" });
}

export function tokenNotProvided(req, res) {
    return res.status(400).json({ message: "Token not provided" });
}