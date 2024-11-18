const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Middleware untuk melayani file statis dari folder images
app.use('/images', express.static(path.join(__dirname, '../images')));

// Endpoint to get data from data.json
app.get("/api/jurusan", (req, res) => {
    const dataPath = path.join(__dirname, "../data.json"); // path to data.json file

    // Read data from the file
    fs.readFile(dataPath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read data" });
        }

        try {
            const jurusanData = JSON.parse(data);
            res.json(jurusanData);
        } catch (parseError) {
            res.status(500).json({ error: "Failed to parse data" });
        }
    });
});

// Endpoint to get jurusan details by ID
app.get("/api/jurusan/:id", (req, res) => {
    const dataPath = path.join(__dirname, "../data.json");
    const jurusanId = parseInt(req.params.id); // Convert the id from string to integer

    fs.readFile(dataPath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read data" });
        }

        try {
            const jurusanData = JSON.parse(data);
            const jurusanDetail = jurusanData.find((jurusan) => jurusan.id === jurusanId);

            if (jurusanDetail) {
                res.json(jurusanDetail);
            } else {
                res.status(404).json({ error: "Jurusan not found" });
            }
        } catch (parseError) {
            res.status(500).json({ error: "Failed to parse data" });
        }
    });
});

app.get("/api/himpunan", (req, res) => {
    const dataPath = path.join(__dirname, "../himpunan.json"); // path to himpunan.json file

    // Read data from the file
    fs.readFile(dataPath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read data" });
        }

        try {
            const himpunanData = JSON.parse(data);
            res.json(himpunanData);
        } catch (parseError) {
            res.status(500).json({ error: "Failed to parse data" });
        }
    });
});

// Endpoint to get himpunan details by ID
app.get("/api/himpunan/:id", (req, res) => {
    const dataPath = path.join(__dirname, "../himpunan.json"); // Path ke file himpunan.json
    const himpunanId = parseInt(req.params.id); // Mengubah id dari string ke integer

    fs.readFile(dataPath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read data" });
        }

        try {
            const himpunanData = JSON.parse(data); // Parse data dari file JSON
            const himpunanDetail = himpunanData.find((himpunan) => himpunan.id === himpunanId);

            if (himpunanDetail) {
                res.json(himpunanDetail); // Jika data ditemukan, kirimkan detail himpunan
            } else {
                res.status(404).json({ error: "Himpunan not found" }); // Jika data tidak ditemukan
            }
        } catch (parseError) {
            res.status(500).json({ error: "Failed to parse data" });
        }
    });
});

app.listen(PORT, () => {
    console.log("Express running on PORT:" + PORT);
});

module.exports = app;
