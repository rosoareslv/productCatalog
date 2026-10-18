export function mongoInternalError(err, req, res) {
    console.log(err)
    return res.status(500).json({ message: "Internal Mongo error" });
}

export function userNotFound(req, res) {
    return res.status(404).json({ message: "User not found" });
}
