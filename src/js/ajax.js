/* eslint-disable  */
$(() => {
  $('.delete').click(function () {
    const id = $(this).attr('id');

    $.post('/task1/PartB/delete', { id }, (res) => { location.reload(); });
  });
  $('#download').click((e) => {
    const url = '/src/saveExcel.xlsx';
    e.preventDefault();
    window.location.href = url;
    console.log('download button');
  });
});
