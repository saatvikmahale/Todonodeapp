const app = require('./App');

const port = process.env.PORT || 5040;

app.listen(port,()=>{
    console.log('listening')
})