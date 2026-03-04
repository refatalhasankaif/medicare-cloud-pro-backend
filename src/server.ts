import app from "./app";
import { envVars } from "./config/env";

const bootstrap = () => {
    try {
        app.listen(envVars.PORT, () => {
            console.log(`Server is tunning on ${envVars.PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server', error)
    }
}

bootstrap();