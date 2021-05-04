
$(function () {
    
    $('#download').click(function(e){
        const url="https://docs.google.com/spreadsheets/d/10gvHUWTPJ9-omNXBsFHvNn65xYTfJYNRoSm1efNOe4k/edit#gid=0"
        e.preventDefault();
        window.location.href=url;
        console.log("download button")
    })
},)

