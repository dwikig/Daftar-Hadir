var dataDosen = {
  id : null,
  data : null,
}

$(document).on('pageinit', '#main', function(){

  var url = 'http://filkom.ub.ac.id/module/api/conf/get_civitas/dosen/' + tanggalSekarang();

  $.ajax({
    url: url ,
    type: 'GET',
    dataType: 'text',
    success: function(result) {

      var resultObj = JSON.parse(atob(result)); // Merubah Base64 ke Obj
      main(resultObj);

    },
    error: function (request,error) {
      alert('Terjadi kegagalan jaringan, silahkan coba kembali!');
    }
  }); // Untuk mendapatkan data dari API

}); 

$(document).on('pagebeforeshow', '#personal', function(){

  console.log("data dosen id = " + dataDosen.id);
  //console.log("array dosen data = "+ dataDosen.data[1].nama);

  for (var i = 0; i < dataDosen.data.length; i++) {

    if (dataDosen.id == dataDosen.data[i].id){
      console.log("ketemu");
      console.log(dataDosen.data[i].nama);

      $('#staff-data').empty();
      $('#staff-data').append('<li><img src="http://file.filkom.ub.ac.id/fileupload/assets/'+ dataDosen.data[i].foto +'"/></li>');
      $('#staff-data').append('<li><h3> '+ dataDosen.data[i].nama +'<h3></li>');
      $('#staff-data').listview('refresh');
    }
  }

}); // Untuk men-inject data sebelum halaman #personal ditampilkan

$(document).on('vclick', '#staff-list li a', function(){
  
  dataDosen.id = $(this).attr('data-id');
  //console.log("id clicked = " + $(this).attr('data-id'));
  $.mobile.changePage( "#personal", { transition: "slide"});
  
}); // Untuk menampilkan halaman #personal ketika list salah satu dosen diklik


function tanggalSekarang() {

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
    dd='0'+dd;
  }
  if(mm<10){
    mm='0'+mm;
  }
  var today = yyyy+'-'+mm+'-'+ dd;

  return today;

} // Untuk mendapatkan tanggal sekarang

function main(resultObj){

  var jsonObj = resultObj;
  dataDosen.data = resultObj;

  for (var i = 0; i < jsonObj.length; i++) {

    var idObj = jsonObj[i].id;
    var namaObj = jsonObj[i].nama;
    var fotoObj = jsonObj[i].foto;
    var hadirObj = "";
    var gelarObj = jsonObj[i].gelar_akhir;
    var ruangObj = jsonObj[i].ruangkerja;
    //Deklarasi awal 

    var bgcolorCustom = "";

    if (jsonObj[i].hadir === "ada"){
      hadirObj = " Hadir ";
      bgColorCustom = '#adeca8';

    } else  {
      hadirObj = " Tidak Hadir ";
      bgColorCustom = '#ffa2a2';
    }

    $('#staff-list')
      .append('<li>' +
       '<a href="#personal" data-id="' + idObj + '">'+
       '<img src="http://file.filkom.ub.ac.id/fileupload/assets/'+ fotoObj +'" style=" border: 10px solid transparent;"/>'+
       '<h3>' + namaObj +" "+ gelarObj + '</h3>'+
       '<p><span style="background-color: #f2d9e4;  color: #f04492;">' + ruangObj + '</span></p>'+
       '<p style="  color: white;"><span id="hadirid" style="background-color:'+ bgColorCustom +'; padding: 5px;">' + hadirObj + '</span></p></a></li>');
  }

  $('#staff-list').listview('refresh');

} // Fungsi utama untuk men-inject data di halaman awal 


