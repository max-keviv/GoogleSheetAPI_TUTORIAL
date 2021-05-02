$(function () {

    $('#refresh').click(function () {
        const name = $('#giveName').val()
        const body = $('#inputText').val()
        const url = $('#selectUser').val()
        const user = $('#selectUser option:selected').text()
        const isaddThanks = document.getElementById("addThanks").checked == true
        const isaddDate = document.getElementById("addDate").checked == true
        const dataobj = new Date()
        let todayDate
        if (isaddDate)
            todayDate = ((dataobj.getDate() < 10) ? ('0' + dataobj.getDate()) : dataobj.getDate()) + '.' + (((dataobj.getMonth() + 1) < 10) ? ('0' + (dataobj.getMonth() + 1)) : (dataobj.getMonth() + 1)) + '.' + dataobj.getFullYear()
        const message = "Dear " + name + ",\n" + (isaddDate ? todayDate : "") + "\n" + body + ".\nYour Choosen option is " + user + " " + url + ".\n" + (isaddThanks ? "Thanks\nVivek" : ("vivek"))
        $('#outputText').html(message)
        console.log(message);
    })
},

)