const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017",{
    dbName:'auth',
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Mongodb connected")
}).catch((err)=>{
    console.log(err)
})

mongoose.connection.on('connected',()=>{
    console.log("Conneted to db");
})

mongoose.connection.on('error',()=>{
    console.log(err.message);
})

mongoose.connection.on('disconnected',()=>{
    console.log("Disconneted to db");
})

process.on('SIGINT',async()=>{
    await mongoose.connection.close()
    process.exit(0)
})


