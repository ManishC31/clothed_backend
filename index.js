require('dotenv').config()
const app = require('./app')


app.listen(process.env.PORT, () => {
    console.log('SERVER IS RUNNING ON PORT ', process.env.PORT)
})