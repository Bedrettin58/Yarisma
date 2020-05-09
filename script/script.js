//soruları hafızaya yükle
var sorular = [
    [' "Koyun kurt ile gezerdi / Fikir başka başka olmasa." sözleri hangi ozana aittir?',
        ['Aşık Veysel', 'Kul Emrah', 'Karacaoğlan', 'William Shakespeare', 'Aşık Reyhani'],
        "A",
        "images/q2.jpg"],
    ['Meşhur Hobbit köyü ne zaman açılmıştı?',
        ['2015', '2016', '2017', '2018', '2019'],
        "E",
        "images/q3.webp"], 
    ['Yanda yer alan görüntüdeki mimari yapı hangisidir ?',
        ['Şifaiye Medresesi', 'Gök Medrese', 'Buruciye Medresesi', 'Sivas Ulu Cami', 'Kale Cami'],
        "B",
        "images/q0.jpg"],
    ['Yandaki görselde hangi yemek bulunmamaktadır ?',
        ['Sivas Katmeri', 'Hıngel', 'Sübüra', 'Dal Turşusu', 'Kesme Aşı'],
        "E",
        "images/q4.jpg"],
    ['Videoda bağlama ile çalınan eser hangisidir?',
        ['Güzelliğin On Par\'Etmez', 'Gesi Bağları', 'Çırpınıp İçinde Döndüğüm  Deniz',
            'Kul Olayım Kalem Tutan Ellere', 'Hiçbiri'],
        "D",
        "images/q1.mp4"]
];

var interval; //kronometre için
var krono = 20;
var soru, puan = 0, sno = 0; //sno:soru no
var secenekler;
var dogrucevap;
var medya, tip;
var secenek = ['A', 'B', 'C', 'D', 'E'];
var secuz = secenek.length;
var secfk = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4 };
var fk = secenek.keys();
var tid;

//sayfa yüklendiğinde yapılacak işlemler
$(document).ready(function () {

    //sayfa yüklendiğinde gizle
    $('.secenekler').toggle();
    $('#dogruYanlis').toggle();
    $('#cizgi').toggle();
    $('#video').css({ 'display': 'none' });

    //oyunu başlatma butonuna basıldığında
    $('#oyunbaslat').click(function () { //bir kere çalışır
        //oyun baslat butonunu gizle, soru seçeneklerini aç
        $(this).hide();
        $('#dogruYanlis').toggle(); //ac
        $('#cizgi').toggle();       //ac
        $('.secenekler').toggle();  //ac

        soruGetir();
    });

    $('.secenek').click(function () {

        offclick();  //seçeneklere tekrar basılamasını engelle   

        var id = $(this).attr('id');    //tıklanan seçeneğin id sini alır
        var tid;
        clearInterval(interval);        //seçeneğe basıldığı için süreyi durdur

        //cevabı karşılaştır
        if (secenek[id] == dogrucevap) { //bilme durumu
            //doğru cevap yeşil yapılıyor
            $(this).css({ 'background-color': '#5ace7d' });
            $('#dogruYanlis').text('Doğru');        //sonuç yazı
            $('#dogruYanlis').css({ 'color': 'lightgreen' }); //sonuç yazı rengi

            //puan artır
            puan++;
            $('#puan').text(puan + "/" + sorular.length);

        } else {      //yanlış cevap
            $('#dogruYanlis').text('Yanlış!');             //sonuç yazı
            $('#dogruYanlis').css({ 'color': 'red' });     //yanlış cevap rengi

            //Yanlış olan cevap kırmızı yapılıyor
            tid = '#' + id;
            $(tid).css({ 'background-color': '#a30865' }); //yanlış cevap kırmızı

            //doğru cevap yeşil yapılarak gösteriliyor
            tid = '#' + secfk[dogrucevap];
            $(tid).css({ 'background-color': '#5ace7d' }); //doğru cevap rengi
        } //eşitse else bloku    
        
        //sonraki soru div aktif yap
        $('#sonrakiSoru').toggle();
        
        $('#sonrakiSoru').click(function () {
            
            //sonraki soruyu getir
            soruGetir();
            onclick();
            $('#sonrakiSoru').toggle(); //sonraki soru div pasif yap

        });
    }); //secenek click bloku

});

//soruyu soru, seçenek, cevap vs ayrıştırma
function soruGetir() {

    //sonuç yazı ve rengi
    $('#dogruYanlis').text('Cevabınız nedir?');
    $('#dogruYanlis').css({ 'color': 'lightgreen' });

    //onceki renkleri eskisine getir
    $('.secenekler .secenek').css({ 'background-color': '#33466b' });

    clearInterval(interval);    //süreyi sıfırla 
    krono = 20;                 //sayacı başa al      
    interval = setInterval(sureGuncelle, 1000);//süreyi başlat

    soru = sorular[sno][0];
    secenekler = sorular[sno][1];
    dogrucevap = sorular[sno][2];
    medya = sorular[sno][3];
    var tmp = medya.split('.');
    var tmpind = sno + 1;
    //video resim oynat/göster
    if (tmp[1] == "mp4") {
        $('#img').css({ 'display': 'none' });
        $('#img-soru').css({ 'display': 'none' });
        $('#video').css({ 'display': 'block' }); 
        $('#vid-soru').css({ 'display': 'block' });

        $('#video source').attr("src", medya);
        $('#vid-soru').html("Soru :" + tmpind + "<br>" + soru);
        $('#video').trigger('play');
    } else {
        $('#vid-soru').css({ 'display': 'none' });
        $('#video').css({ 'display': 'none' });
        $('#img').css({ 'display': 'block' });
        $('#img').attr("src", medya);
        $('#img-soru').html("Soru :" + tmpind + "<br>" + soru);
    }
    //cevap seçeneklerini göster
    for (let i = 0; i < secenekler.length; i++) {
        tmp = "#" + i;
        $(tmp).text(secenekler[i]);
    }
    sno++;
}

//seçeneklere basılamasını engelle 
function offclick() {
    $('.secenekler .secenek').attr('disabled', true);
}
//seçeneklere basılamasını izin ver 
function onclick() {
    $('.secenekler .secenek').attr('disabled', false);
}
//kronometreyi güncelle
function sureGuncelle() {
    krono--;
    if (krono < 10) krono = "0" + krono;
    $('#krono').text("00:" + krono);
    if (krono == 0) {
        clearInterval(interval);
        //cevaplamadıysa doğru cevabı göster

    }
}

