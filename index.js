
const express = require("express");
const app = express();
const reader = require('xlsx')
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const fs = require('fs');
const exceljs = require('exceljs');
app.set('view engine', 'ejs');
app.use("/", express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

// fs.access('./src/saveExcel.xlsx', (err) => {
//     console.log("working")
//     if (err) {

//         fs.open('./src/saveExcel.xlsx', 'w+', (err, file) => { });
//         console.log("file created")
//     }
//     else
//         console.log("file exist");
// })




try {
    if (fs.existsSync('./src/saveExcel.xlsx')) {
        console.log("The file exists.");
    } else {
        console.log('The file does not exist.');
        fs.open('./src/saveExcel.xlsx', 'w+', (err, file) => { });
        console.log("file created")
    }
} catch (err) {
    console.error(err);
}



const items = [];

const file = reader.readFile('./src/saveExcel.xlsx')
const sheets_list = file.SheetNames
// for (let i = 0; i < sheets_list.length; i++) {
console.log(sheets_list[sheets_list.length - 1])
const temp = reader.utils.sheet_to_json(file.Sheets[sheets_list[sheets_list.length - 1]])
console.log(temp)
temp.forEach((res) => { items.push(res) })
// }
console.log(items)
app.get("/PartA", (req, res) => { res.render("partA", { items: items }) })

app.post("/PartA/addnamelink", (req, res, next) => {
    items.push({ name: req.body.add_name, link: req.body.add_link });
    res.redirect('/partA');
})


app.get("/", (req, res) => { res.render("page")})

app.post('/PartA/save', (req, res, next) => {
    // fs.writeFileSync("./src/saveExcel.xlsx", "", (err) => { if (err) console.log(err); console.log("cleared") })
    console.log("save file")
    // const workbook = new exceljs.Workbook();
    // const worksheet = workbook.getWordksheet('Sheet1');
    // worksheet.addRow({ id: 1, name: 'vivek' })
    // workbook.worksheets[0].columns = [{ header: 'Name', key: 'name' }, { header: 'Url', key: 'URL' }];
    // workbook.worksheets[0].columns
    const ws = reader.utils.json_to_sheet(items)
    reader.utils.book_append_sheet(file, ws, sheets_list[sheets_list.length])
    reader.writeFile(file, './src/saveExcel.xlsx')
    console.log("file written")
    res.redirect('/PartA');
})

app.get("/partB", (req, res) => {
    res.render("partB", { items: items });
})

app.listen(process.env.PORT || 2000, () => { console.log("server at port 2000"); });