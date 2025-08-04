const { redisClient } = require("../functions/redis");

function getConnection(req,res, next) {
    try {
        req.redis = redisClient;
        next();
    } catch (error) {
        throw error       
    }
}

module.exports = getConnection