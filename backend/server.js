let app = require('./src/app.js')
let connecttodb = require('./src/config/database')
app.listen(3000,()=> {
    console.log('server is running on port 3000')
})
connecttodb()