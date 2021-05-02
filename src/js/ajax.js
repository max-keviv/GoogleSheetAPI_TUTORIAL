
$(function () {
    $(".delete").click(function(){
        const id = $(this).attr('id');
     
    $.post('PartB/delete',{id},(res)=>{location.reload()})
    })
},)