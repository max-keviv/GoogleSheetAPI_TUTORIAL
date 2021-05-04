
const express = require("express");
const app = express();
const xlsx = require('xlsx')
const {google} = require('googleapis');
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const fs = require('fs');
app.set('view engine', 'ejs');
app.use("/", express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
const keys = require('./client_secret.json');



// ///////////////////////TASK 1//////////////////////////
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

///////////////////////TASK 1 END/////////////////////
/////////////////////////////////////////////////
////////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
///////////////////////////TASK 2///////////////////////


const scopes=['https://www.googleapis.com/auth/spreadsheets'];
// Create an JWT client to authorize the API call
const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    scopes,
);

client.authorize(function(err,tokens){
    if(err)
    {
        console.log(err);
    }
    else{
        console.log('connected');
        
    }
})

async function gsrun(client)
{
    const gsapi = google.sheets({version:'v4',auth:client});
    const opt = {
        spreadsheetId: '10gvHUWTPJ9-omNXBsFHvNn65xYTfJYNRoSm1efNOe4k',
        range: 'A2:B5'
    }

    const data= await gsapi.spreadsheets.values.get(opt);
    const records = data.data.values;
    return records;
}

async function gsadd(client,newData)
{
    const gsapi = google.sheets({version:'v4',auth:client});
   
    const updateOptions = {
        spreadsheetId: '10gvHUWTPJ9-omNXBsFHvNn65xYTfJYNRoSm1efNOe4k',
        range: 'A:B',
        valueInputOption: 'USER_ENTERED',
        resource: { values: newData},
    }
    const res = await gsapi.spreadsheets.values.append(updateOptions);
    console.log(res)
}

let records;


app.get('/task2/parta',async (req,res)=>{
    records = await gsrun(client)
    console.log(records)
    res.render('task2-partA',{items:records})
 })
 
 app.post('/task2/parta/save',async (req,res)=> {
     const data = [[ req.body.add_name,req.body.add_link]]
     
     await gsadd(client,data)
 
     res.redirect("/task2/parta");
 })
 
 app.get("/task2/partB", (req, res) => {
     res.render("task2-partB", { items: records });
 })
 


/////////////////////////////TASK 2 END /////////////////////////


app.listen(process.env.PORT || 2000, () => { console.log("server at Running "); });