
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





const wb = xlsx.readFile('./src/saveExcel.xlsx')
const ws=wb.Sheets["Sheet1"];
const items=xlsx.utils.sheet_to_json(ws);
app.get("/PartA", (req, res) => { res.render("partA", { items: items }) })

app.post("/PartA/addnamelink", (req, res, next) => {
    items.push({ name: req.body.add_name, link: req.body.add_link });
    res.redirect('/partA');
})


app.get("/", (req, res) => { res.render("page")})

app.post('/PartA/save', (req, res, next) => {
    const newWB=xlsx.utils.book_new();
    const newWS=xlsx.utils.json_to_sheet(items);
    xlsx.utils.book_append_sheet(newWB,newWS,"Sheet1");
    xlsx.writeFile(newWB, './src/saveExcel.xlsx')
    console.log("file written")
    res.redirect('/PartA');
})

app.post('/PartB/delete',(req,res)=>{
    const id = req.body.id;
	console.log(id);
    delete items[id];
    console.log(items)
    console.log("length:"+items.length)
	res.send("/PartA")
})

app.get("/partB", (req, res) => {
    res.render("partB", { items: items });
})

app.listen(process.env.PORT || 2000, () => { console.log("server at Running "); });