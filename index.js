
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");

app.set('view engine', 'ejs');
app.use("/", express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

const items = [{ name: 'vivek', link: 'google' }, { name: 'vishal', link: 'google.com' }, { name: 'vicky', link: 'facebook' }];
// console.log(items[0])s
app.get("/", (req, res) => { res.render("page", { items: items }) })

app.get("/partA", (req, res) => { })

app.get("/partB", (req, res) => { })

app.listen(process.env.PORT || 2000, () => { console.log("server at port 2000"); });