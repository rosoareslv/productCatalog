export function invalidEndpoint(req, res) {
    return res.status(404).json({ message: "Unavailable endpoint" });
}

export function defaultError(err, req, res) {
    console.log(err)
    return res.status(500).json({ message: "Internal API error" });
}