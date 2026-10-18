import logger from "morgan";
import fs from "fs";

export function defineLogLevel(app, environment) {

    let logLevel = undefined;

    if (environment === "test") {
        app.use(
            logger("combined", {
                stream: fs.createWriteStream("/logs/testLog.log", { flags: "a" }),
            }),
        );
        logLevel = "Test"
    } else if (environment === "prod") {
        app.use(
            logger("combined", {
                stream: fs.createWriteStream("/logs/prodLog.log", { flags: "a" }),
            }),
        );
        logLevel = "Production"
    } else if (environment == "dev") {
        app.use(logger("dev"));
        logLevel = "Development"
    } else {
        console.log(`Log level ${logLevel}`)
    }

}
