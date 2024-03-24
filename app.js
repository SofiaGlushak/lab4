const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);
const app = express();
const jsonParser = express.json();
 
const songScheme = new Schema({name: String, artist: String, album: String, listening: Number}, {versionKey: false});
const Song = mongoose.model("Song", songScheme);
 
app.use(express.static(__dirname + "/public"));
 
mongoose.connect("mongodb://localhost:27017/playlist"

, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер очікує на підключення...");
    });
});
  
app.get("/api/songs", function(req, res){
        
    Song.find({}, function(err, songs){
 
        if(err) return console.log(err);
        res.send(songs)
    });
});
 
app.get("/api/songs/:id", function(req, res){
         
    const id = req.params.id;
    Song.findOne({_id: id}, function(err, song){
          
        if(err) return console.log(err);
        res.send(song);
    });
});
    
app.post("/api/songs", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const songName = req.body.name;
    const artist = req.body.artist;
    const album = req.body.album;
    const listening = req.body.listening;
    const song = new Song({name: songName, artist: artist, album: album, listening: listening});
        
    song.save(function(err){
        if(err) return console.log(err);
        res.send(song);
    });
});
     
app.delete("/api/songs/:id", function(req, res){
         
    const id = req.params.id;
    Song.findByIdAndDelete(id, function(err, song){
                
        if(err) return console.log(err);
        res.send(song);
    });
});
    
app.put("/api/songs", jsonParser, function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const songName = req.body.name;
    const artist = req.body.artist;
    const album = req.body.album;
    const listening = req.body.listening;
    const newSong = {name: songName, artist: artist, album: album, listening: listening};
     
    Song.findOneAndUpdate({_id: id}, newSong, {new: true}, function(err, song){
        if(err) return console.log(err); 
        res.send(song);
    });
});
