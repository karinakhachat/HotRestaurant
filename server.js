// Dependencies
// =============================================================
const express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
let PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ID Counter
let counter = 1;

// Tables
// =============================================================
const tables = [];

//
// =============================================================
const waitList = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Makes a reservation 
app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all tables
app.get("/api/tables", (req, res) => {
    return res.json(tables);
});

// Displays wait list 
app.get("/api/waitlist", (req, res) => {
    return res.json(waitList);
});

// Create New table - takes in JSON input
app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newReservation = req.body;
    newReservation.uniqueID = counter;
    counter++;

    console.log(newReservation);

    if (tables.length < 5) {
        tables.push(newReservation);
        res.json(newReservation);
    } else {
        waitList.push(newReservation);
        return res.json(false);
    }

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});