import app from "./app";

const port = process.env.PORT;


const bootstrap = () => {
    try {
        app.listen(5000, () => {
            console.log(`Server is tunning on http://localhost:5000`)
        })
    } catch (error) {
        console.error('Failed to start server', error)
    }
}

bootstrap();