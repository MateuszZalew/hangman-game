var hasla = new Array();
hasla[0] = "Bez pracy nie ma kołaczy";
hasla[1] = "Apetyt rośnie w miarę jedzenia";
hasla[2] = "Co dwie głowy, to nie jedna";
hasla[3] = "Fortuna kołem się toczy";
hasla[4] = "Nie chwal dnia przed zachodem słońca";
hasla[5] = "Dzieci i ryby głosu nie mają";
haslo = hasla[Math.floor(Math.random() * hasla.length + 1)];
haslo = haslo.toUpperCase();

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

var ile_skuch = 0;
var dlugosc = haslo.length;
var haslo1 = "";

for (i = 0; i < dlugosc; i++) {
    if (haslo.charAt(i) == " ") {
        haslo1 += " ";
    } else if (haslo.charAt(i) == ",") {
        haslo1 += ",";
    }
     else {
        haslo1 += "-";
    }
}

function wypisz_haslo() {
    document.getElementById("board").innerHTML = haslo1;
}

window.onload = start;

var litery = ["A","Ą","B", "C", "Ć","D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N","Ń", "O","Ó", "P","Q","R", "S","Ś", "T", "U", "V","W", "X", "Y", "Z", "Ź", "Ż"];

function start() {
    var tresc_diva = "";

    for(i = 0; i < 35; i++) {
        var element = "lit" + i;
        tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">' + litery[i] + '</div>';
        if((i+1) % 7 == 0) {
        tresc_diva = tresc_diva + '<div style="clear: both;"></div>';
        }
    }

    document.getElementById("alphabet").innerHTML = tresc_diva;

    wypisz_haslo();
}

String.prototype.ustawZnak = function (miejsce, znak) {
    if(miejsce > this.length - 1) return this.toString();
    else return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
}

function sprawdz(nr) {

    var trafiona = false;

    for(i=0; i < dlugosc; i++) {
        if(haslo.charAt(i) == litery[nr]) {
            haslo1 = haslo1.ustawZnak(i, litery[nr]);
            trafiona = true;
        }
    }

    if(trafiona == true) {
        yes.play();

        var element = "lit" + nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");

        wypisz_haslo();
    } else {
        no.play();

        var element = "lit" + nr;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");
        
        ile_skuch++;
        var obraz = "img/s"+ile_skuch+".jpg";
        document.getElementById("gallows").innerHTML = '<img src="'+obraz+'" alt="">';
    }
    if (haslo == haslo1) {
        document.getElementById("alphabet").innerHTML = "Tak jest! Podano prawidłowe hasło: "+haslo+'<br/><br/><span class="reset" onclick ="location.reload()">JESZCZE RAZ?</span>';
    }

    if(ile_skuch >= 9) {
        document.getElementById("alphabet").innerHTML = "Przegrana! Prawidłowe hasło: "+haslo+'<br/><br/><span class="reset" onclick ="location.reload()">JESZCZE RAZ?</span>';
    }
}