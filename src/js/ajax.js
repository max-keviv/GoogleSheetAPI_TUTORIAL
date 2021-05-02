function addNameLink() {
    const item = { name: "", link: "" };
    item.name = document.getElementById("inputName").value;
    item.link = document.getElementById("inputLink").value;
    var ajax = new XMLHttpRequest();
    var data = document.getElementById("formID");
    var formdata = new FormData(data);
    ajax.open("post", "/addnamelink", true);
    ajax.send("vivek");

};

function saveFile() {
    console.log("save")
};