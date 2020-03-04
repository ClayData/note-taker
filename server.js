const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res){
    return res.json(path.join(__dirname, "/db/db.json"));
});


app.post("/api/notes", function(req, res) {
    let newNote = req.body;

    newNote.routeName = newNote.title.replace(/\s+/g, "").toLowerCase()

    fs.appendFileSync(__dirname + "/db/db.json", newNote, function(err, data) {
        
        if (err) throw err;
        res.end(data);
    });
})


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});