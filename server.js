const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;



let notesList = [];
fs.readFile("db/db.json", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }

    notesList = JSON.parse(data);
    
});

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
    res.sendFile(path.join(__dirname, "db/db.json"))
});


app.post("/api/notes", function(req, res) {
    let newNote = (req.body);
    newNote.id = notesList.length;
    res.json(true);
    notesList.push(newNote);
    
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notesList), function(err, data) {
        
        if (err) throw err;
        res.end(data);
    });
})

app.delete("/api/notes/:id", function(req, res) {
    let oldNote = req.params.id;
    // console.log(oldNote);
    // console.log(notesList[1].id)
    deleteNote(oldNote);


    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notesList), function(err, data) {
        
        if (err) throw err;
        res.end(data);
    });
})

function deleteNote(id){

    for(let i = 0; i < notesList.length; i++){
        if(notesList[i].id === parseInt(id)){
            delete(notesList[i].title);
            delete(notesList[i].name);
            delete(notesList[i].id);
            
        }
    }
}

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});