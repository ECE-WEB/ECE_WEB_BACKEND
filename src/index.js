const express = require('express')
const app = express()
const mongoose = require("mongoose")
const Announcement = require("./models/announcement")
const announcementRouter = require("./routers/v1/index");
require("dotenv").config();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const url = process.env.MONGO_URL;
console.log(url);

main().then((res)=>{
    console.log("DB Connection successful");
}) .catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb+srv://kdineshkumar8877:Dinesh811@ece-database.6urke.mongodb.net/?retryWrites=true&w=majority&appName=ECE-Database");
}

const api = require("./routers/index")
app.use('/api',api)
const PORT=process.env.PORT || 9000;
app.listen(PORT,()=>{
    console.log(`Server is listening to PORT:${PORT}`)
})


app.get("/adddata",async (req,res)=>{
    const sample = new Announcement({
        "title": "Upcoming Hackathon 2025",
      "announcer_id": 101,
      "suggestions": "Prepare in advance, form teams, and check the rules.",
      "file": "hackathon_guidelines.pdf",
      "description": "We are excited to announce the annual Hackathon 2025! It will be held on April 15th. Registrations are open till April 10th.",
      "createdAt": "2025-03-17T10:30:00.000Z",
      "category":"jobs"
    })
    // let sample_save = await sample.save();
    console.log(sample_save);
})

app.use("/announcement",announcementRouter);
