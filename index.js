
const express = require("express");
const app = express();
const xlsx = require('xlsx')
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const fs = require('fs');
const exceljs = require('exceljs');
const { stringify } = require("querystring");
app.set('view engine', 'ejs');
app.use("/", express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));


let items;


app.get("/", (req, res) => { res.render("page")})

app.get("/task1/PartA", (req, res) => {
    const wb = xlsx.readFile('./src/saveExcel.xlsx')
    const ws=wb.Sheets["Sheet1"];
    items=xlsx.utils.sheet_to_json(ws);
    console.log(items)
    res.render("partA", { items: items }) 
})



app.post('/task1/PartA/save', (req, res, next) => {
    items.push({ name: req.body.add_name, link: req.body.add_link });
    const newWB=xlsx.utils.book_new();
    const newWS=xlsx.utils.json_to_sheet(items);
    xlsx.utils.book_append_sheet(newWB,newWS,"Sheet1");
    xlsx.writeFile(newWB, './src/saveExcel.xlsx')
    console.log("file written")
    res.redirect('/task1/PartA');
})

app.post('/task1/PartB/delete',(req,res)=>{
    const id = req.body.id;
	console.log(id);
    delete items[id];
    const newWB=xlsx.utils.book_new();
    const newWS=xlsx.utils.json_to_sheet(items);
    xlsx.utils.book_append_sheet(newWB,newWS,"Sheet1");
    xlsx.writeFile(newWB, './src/saveExcel.xlsx')
    console.log(items)
    console.log("length:"+items.length)
	res.send("/task1/PartA")
})

app.get("/task1/partB", (req, res) => {
    res.render("partB", { items: items });
})

app.listen(process.env.PORT || 2000, () => { console.log("server at Running "); });