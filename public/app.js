console.log("Hello World");

window.addEventListener('load', function(){
    var promptVal = prompt('Diese Website nutzt Kekse (lecker schmecka) um dir einen Geburtstagsgruß auszurichten. Falls du keine Kekse magst, bist du ein komischer Mensch und darfst diese Website nicht benutzen! Falls doch, gebe zur Bestätigung "KEKSE BESTE ALLA" ein:')
    if(promptVal != "KEKSE BESTE ALLA"){
        alert("... du bist ja mal wieder witzig ");
        //window.location.href = "https://www.stempel-schilder-druck.de/media/catalog/product/cache/3/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/m/o/motivstempel_nicht_witzig_60x15mm_holz___nicht-witzig-stempel.gif";
    }else{
        alert("Danke!");
    }

    var birthdaySong = document.getElementById('birthday-song');
    var skeletor = document.getElementById('skeletor');

    console.log(birthdaySong, skeletor);

    birthdaySong.addEventListener('play', function(){
        skeletor.classList.remove('skeletor-invisible');
    });

    birthdaySong.addEventListener('pause', function(){
        skeletor.classList.add('skeletor-invisible');
    });


    //init quizz countdown
    var thresholdDate = new Date();
    var now = Date.now();
    thresholdDate.setDate(5);
    thresholdDate.setHours(19);
    thresholdDate.setMinutes(30);
    thresholdDate.setSeconds(0);
    console.log(thresholdDate);
    var diff = Math.floor(Math.abs(thresholdDate - now) / 1000);
    var countdown = document.getElementById("countdown");

    setInterval(function(){
        diff--;

        if(diff > 0){
            var hours = Math.floor(diff / 60 / 60);
            var minutes = diff / 60 % 60;
            var seconds = diff % 60;
            var hString = "";
            var mString = "";
            var sString = "";
            hString = Math.floor(hours) + "";
            mString = Math.floor(minutes) + "";
            sString = Math.floor(seconds) + "";
            if(hours < 10) hString = "0" + hString;
            if(minutes < 10) mString = "0" + mString;
            if(seconds < 10) sString = "0" + sString;
            
            countdown.innerHTML = "T - " + hString  + ":" + mString + ":" + sString;
        }else{
            countdown.innerHTML = "Zu den Aufgaben!";
        }
        
    }, 1000);

    
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }