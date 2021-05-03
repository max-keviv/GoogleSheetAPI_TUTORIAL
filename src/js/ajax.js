
$(function () {
    $(".delete").click(function(){
        const id = $(this).attr('id');
     
    $.post('PartB/delete',{id},(res)=>{location.reload()})
    })
    $('#download').click(function(e){
        const url="src/saveExcel.xlsx"
        e.preventDefault();
        window.location.href=url;
        console.log("download button")
    })
},)

