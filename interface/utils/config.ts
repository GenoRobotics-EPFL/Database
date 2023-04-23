export const FLAG_DEPLOY = false

export const DEV_URL = "http://localhost:8000"
export const PROD_URL = "https://database-production-2c9f.up.railway.app"

export const URL = FLAG_DEPLOY ? PROD_URL : DEV_URL