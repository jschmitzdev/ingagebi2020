window.addEventListener('load', function(){
    if(getCookie("skipCookiePrompt") == "true"){
        console.log("skipping cookies");
        setCookie("skipCookiePrompt", "false", 1);
    }else{
        var promptVal = prompt('Diese Website nutzt Kekse (lecker schmecka) um dir einen Geburtstagsgruß auszurichten. Falls du keine Kekse magst, bist du ein komischer Mensch und darfst diese Website nicht benutzen! Falls doch, gebe zur Bestätigung "KEKSE BESTE ALLA" ein:')
        if(promptVal != "KEKSE BESTE ALLA"){
            alert("... du bist ja mal wieder witzig ");
            window.location.href = "https://www.stempel-schilder-druck.de/media/catalog/product/cache/3/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/m/o/motivstempel_nicht_witzig_60x15mm_holz___nicht-witzig-stempel.gif";
        }else{
            alert("Danke!");
        }
    }    

    if(window.location.pathname != "/"){
        setCookie("skipCookiePrompt", "true", 1);
    }

    var birthdaySong = document.getElementById('birthday-song');
    var skeletor = document.getElementById('skeletor');

    birthdaySong && birthdaySong.addEventListener('play', function(){
        skeletor.classList.remove('skeletor-invisible');
    });

    birthdaySong && birthdaySong.addEventListener('pause', function(){
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

    var intvl = setInterval(function(){
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
            if(window.location.pathname == "/"){
                countdown.innerHTML = "Zu den Aufgaben!";
                countdown.setAttribute('href', "/aufgaben");
                countdown.addEventListener("click", function(){
                    setCookie("skipCookiePrompt", "true", 1);
                })
                clearInterval(intvl);
            }else if(window.location.pathname == "/aufgaben"){
                //init quizz questions
                initQuizzQuestions();
                clearInterval(intvl);
            }
        }        
    }, 1000);

    //init side menu
    var sideMenu = document.querySelector(".side-menu");
    var hamburger = document.getElementById("navHamburger");
    var homeLink = document.getElementById("home-link");
    var aufgabenLink = document.getElementById("aufgaben-link");

    hamburger && hamburger.addEventListener("click", function(){
        sideMenu.classList.toggle("side-menu-hidden");
    });

    homeLink && homeLink.addEventListener("click", function(){
        setCookie("skipCookiePrompt", "true", 1);
    });

    aufgabenLink && aufgabenLink.addEventListener("click", function(){
        setCookie("skipCookiePrompt", "true", 1);
    });


    //init second birthday song
    var audioElem = document.getElementById("birthday-song-jan");
    var bendzko = document.getElementById("bendzko");

    fetch("/songdeleted").then(function(res){
        if(!res.ok){
            console.log("could not get song.");
            audioElem.outerHTML = "";
            bendzko.outerHTML = "";
        }else{
            audioElem.setAttribute("src", "/song");
        }
    }).catch(function(res){
        console.log("fetch failed.");
    });

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

  function initQuizzQuestions(){
    console.log("building quiz..");
    var countdown = document.getElementById("countdownWrap");
    var quiz = document.getElementById("quizWrap");
    var quizForm = document.getElementById("quizForm");
    var answerResult = document.getElementById("quizAnswerExplained");
    var question = document.getElementById("quizQuestion");
    var answer0 = document.getElementById("answer0");
    var answer1 = document.getElementById("answer1");
    var answer2 = document.getElementById("answer2");
    var answer3 = document.getElementById("answer3");
    var label0 = document.getElementById("label0");
    var label1 = document.getElementById("label1");
    var label2 = document.getElementById("label2");
    var label3 = document.getElementById("label3");
    var button = document.getElementById("quizButton");
    var explanationButton = document.querySelectorAll(".explanationButton");

    countdown.classList.add("hide-countdown");

    var currQuestionIndex = 0;
    if(getCookie("currQuestion")){
        currQuestionIndex = parseInt(getCookie("currQuestion"));
    }
    if(currQuestionIndex >= quizzQuestions.length){
        console.log("no more questions. building summary..");
        buildResultScreen();
        return;
    }
    var score = 0;
    if(getCookie("score")){
        score = parseInt(getCookie("currQuestion"));
    }

    question.innerHTML = quizzQuestions[currQuestionIndex].question;
    label0.innerHTML = quizzQuestions[currQuestionIndex].answers[0];
    label1.innerHTML = quizzQuestions[currQuestionIndex].answers[1];
    label2.innerHTML = quizzQuestions[currQuestionIndex].answers[2];
    label3.innerHTML = quizzQuestions[currQuestionIndex].answers[3];
    answer0.checked = false;
    answer1.checked = false;
    answer2.checked = false;
    answer3.checked = false;
    answer0.setAttribute("value", quizzQuestions[currQuestionIndex].answers[0]);
    answer1.setAttribute("value", quizzQuestions[currQuestionIndex].answers[1]);
    answer2.setAttribute("value", quizzQuestions[currQuestionIndex].answers[2]);
    answer3.setAttribute("value", quizzQuestions[currQuestionIndex].answers[3]);
    answer0.addEventListener("click", function(){
        quizForm.value = this.value;
    });
    answer1.addEventListener("click", function(){
        quizForm.value = this.value;
    });
    answer2.addEventListener("click", function(){
        quizForm.value = this.value;
    });
    answer3.addEventListener("click", function(){
        quizForm.value = this.value;
    });

    //next question button
    button.addEventListener("click", function listener(evt){
        button.removeEventListener("click", listener);
        evt.preventDefault();
        submitQuizAnswer();
    });

    quiz.classList.remove("hide-quiz");
  

    function submitQuizAnswer(){
        console.log("submitting answer..");
        console.log("form val:", quizForm.value);

        var answeredCorrect = false;
        if(quizForm.value == quizzQuestions[currQuestionIndex].answers[quizzQuestions[currQuestionIndex].correctAnswer]){
            answeredCorrect = true;
        }

        if(answeredCorrect){
            document.getElementById("correctAnswer").classList.remove("hide-quiz");

            var nextBtn = document.getElementById("explanationButtonRight");
            nextBtn.addEventListener("click", function listen(e){
                nextBtn.removeEventListener("click", listen);
                console.log("next question");
                e.preventDefault();
                currQuestionIndex++;
                setCookie("currQuestion", currQuestionIndex, 1);
                document.getElementById("correctAnswer").classList.add("hide-quiz");
                answerResult.classList.add("hide-quiz");
                initQuizzQuestions();
            });

            setCookie("score", score++, 1);
        }else{
            var explanation = document.getElementById("wrongAnswer");
            document.getElementById("explanation").innerHTML = quizzQuestions[currQuestionIndex].answers[quizzQuestions[currQuestionIndex].correctAnswer];
            explanation.classList.remove("hide-quiz");

            var nextBtn = document.getElementById("explanationButtonWrong");
            nextBtn.addEventListener("click", function listen(e){
                nextBtn.removeEventListener("click", listen);
                console.log("next question");
                e.preventDefault();
                currQuestionIndex++;
                setCookie("currQuestion", currQuestionIndex, 1);
                document.getElementById("wrongAnswer").classList.add("hide-quiz");
                answerResult.classList.add("hide-quiz");
                initQuizzQuestions();
            });
        }

        quiz.classList.add("hide-quiz");
        answerResult.classList.remove("hide-quiz");
    }

    function buildResultScreen(){
        console.log("building result screen..");

        var resultScreen = document.getElementById("resultScreen");
        var passed = document.getElementById("passed");
        var failed = document.getElementById("failed");
        var finalScore = parseInt(getCookie("score"));
        var playAgain = document.getElementById("playAgainBtn");

        resultScreen.classList.remove("hide-quiz");
        if(finalScore >= 6){
            document.getElementById("passedScore").innerHTML = finalScore + "/7";
            passed.classList.remove("hide-quiz");
        }else{
            document.getElementById("failedScore").innerHTML = finalScore + "/7";
            failed.classList.remove("hide-quiz");
        }

        playAgain.addEventListener("click", function(){
            resultScreen.classList.add("hide-quiz");
            passed.classList.add("hide-quiz");
            failed.classList.add("hide-quiz");
            setCookie("score", "0", 1);
            setCookie("currQuestion", "0", 1);
            initQuizzQuestions();
        });
    }

}

const quizzQuestions = [
    {
    question: "Welcher Nerv ist beim positiven Flaschenzeichen betroffen?",
    answers: [
        "N. radialis", "R. profundus nervi radialis", "N. ulnaris", "N. medianus"
    ],
    correctAnswer: 3
    },
    {
    question: "Wie nimmt der Mensch die Umwelt in der primären Sehrinde war?",
    answers: [
        "In Kreisen und Kugeln", "In Quadraten und Rauten", "in Säulen und Rechtecken", "In 7 verschiedenen, nochmals unterteilten, Schichten"
    ],
    correctAnswer: 2
    },
    {
    question: "Warum gibt man bei OPs Heparin anstatt Marcumar?",
    answers: [
        "Weil Heparin ein körpereigener Stoff ist und somit wirkt", "Weil man es schnell antagonisieren kann", "Weil man besser versichert hat", "Weil Marcumar kein Blutverdünner ist"
    ],
    correctAnswer: 1
    },
    {
    question: "In welche Endprodukte spaltet die Aldolase Fructose-1-Phosphat?",
    answers: [
        "Glycinaldehyd & Dihydroxyacetonphosphat", "Glycinaldehyd-3-Phosphat & Dihydroxyacetonphosphat", "Glycinaldehydmonophosphat & Dihydroxyacetonphosphat", "Glycinaldehyd-3-Phosphat & Dihydroacetonphosphat"
    ],
    correctAnswer: 0
    },
    {
    question: "Was versteht man unter einer interponierten Extrasystole?",
    answers: [
        "Eine Sinusknotentachykardie, das Herz schlägt 'zu viel'", "Eine Extrasystole, die den Rhytmus des Herzens nicht verändert.", "Eine kontinuierliche Dopplung vom QRS-Komplex", "ein Phänomen, welches die P-Welle verändert"
    ],
    correctAnswer: 1
    },
    {
    question: "Was passiert mit dem Patienten, wenn er sog. 'Entkoppler' zu sich nimmt?",
    answers: [
        "Fieber, Schwitzen", "Nix, kann man nicht erkennen", "Tod", "Krämpfe und Zuckungen"
    ],
    correctAnswer: 0
    },
    {
    question: "Welcher Schädelknochen ist allgemein als 'Keilbein' bekannt?",
    answers: [  
        "Os ethmoidale", "Os zygomaticum", "Os parietale", "Os sphenoidale"
    ],
    correctAnswer: 3
    }
]