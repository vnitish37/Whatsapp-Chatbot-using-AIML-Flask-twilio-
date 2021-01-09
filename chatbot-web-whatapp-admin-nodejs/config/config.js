module.exports = {
    PORT: process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL || "mongodb+srv://nitish:nitish123@cluster0-kgyzb.mongodb.net/test?retryWrites=true&w=majority",
    DEVELOPER: process.env.DEVELOPER || "NITISH V",
    BASE_URL: process.env.BASE_URL || "http://localhost"
}