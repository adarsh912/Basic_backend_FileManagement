const express = require("express");
const app = express();
const path = require("path");
//to read files
const fs = require("fs")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    //to read files
    fs.readdir('./files', function (err, files) {
        res.render("index", { files: files });
    })
})

app.get("/files/:filename", function (req, res) {
    //to read files
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
        res.render("show", { filename: req.params.filename, filedata: filedata });
    })
})



app.get("/edit/:filename", function (req, res) {

    res.render("edit" ,{filename:req.params.filename});
})


app.post("/create", function (req, res) {
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) {
        res.redirect("/");
    })
})

// { previous: 'first.txt', new: 'naya nam' }
app.post("/edit", function (req, res) {
    // console.log(req.body); 
 fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new.split(' ').join('')}.txt`,function(err){
    res.redirect('/'); 
 })
})

app.listen(3000);