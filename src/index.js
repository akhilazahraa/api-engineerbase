const express = require("express")
const app = express()
const dotenv = require("dotenv")
const fs = require("fs")
const path = require("path")

dotenv.config()

const PORT = process.env.PORT

app.use(express.json());


// Endpoint to get data from data.json
app.get("/api/jurusan", (req, res) => {
    const dataPath = path.join(__dirname, "../data.json") // path to data.json file

    // Read data from the file
    fs.readFile(dataPath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read data" })
        }
        
        try {
            const jurusanData = JSON.parse(data)
            res.json(jurusanData)
        } catch (parseError) {
            res.status(500).json({ error: "Failed to parse data" })
        }
    })
})

// Endpoint to get jurusan details by ID
app.get("/api/jurusan/:id", (req, res) => {
    const dataPath = path.join(__dirname, "../data.json")
    const jurusanId = parseInt(req.params.id) // Convert the id from string to integer

    fs.readFile(dataPath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read data" })
        }
        
        try {
            const jurusanData = JSON.parse(data)
            const jurusanDetail = jurusanData.find((jurusan) => jurusan.id === jurusanId)

            if (jurusanDetail) {
                res.json(jurusanDetail)
            } else {
                res.status(404).json({ error: "Jurusan not found" })
            }
        } catch (parseError) {
            res.status(500).json({ error: "Failed to parse data" })
        }
    })
})



app.listen(PORT, () => {
    console.log("Express running on PORT:" + PORT)
})

module.exports = app