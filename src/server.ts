import app from "./app"
import { envVars } from "./app/config/env"
import { initDB } from "./app/db"





app.listen(envVars.PORT, async () => {
    await initDB()
    console.log(`server is listening on port ${envVars.PORT}`)
})