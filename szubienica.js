const sayings = new Array();
sayings[0] = "Bez pracy nie ma kołaczy";
sayings[1] = "Apetyt rośnie w miarę jedzenia";
sayings[2] = "Co dwie głowy, to nie jedna";
sayings[3] = "Fortuna kołem się toczy";
sayings[4] = "Nie chwal dnia przed zachodem słońca";
sayings[5] = "Dzieci i ryby głosu nie mają";
sayingToGuess = sayings[Math.floor(Math.random() * sayings.length)];
sayingToGuess = sayingToGuess.toUpperCase();

const yes = new Audio("yes.wav");
const no = new Audio("no.wav");

yes.volume = 0.2;
no.volume = 0.07;

let ile_skuch = 0;
const length = sayingToGuess.length;
let currentGuess = "";

for (i = 0; i < length; i++) {
  if (sayingToGuess.charAt(i) == " ") {
    currentGuess += " ";
  } else if (sayingToGuess.charAt(i) == ",") {
    currentGuess += ",";
  } else {
    currentGuess += "-";
  }
}

function print_saying() {
  document.getElementById("board").innerHTML = currentGuess;
}

window.onload = start;

const letters = [
  "A",
  "Ą",
  "B",
  "C",
  "Ć",
  "D",
  "E",
  "Ę",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "Ł",
  "M",
  "N",
  "Ń",
  "O",
  "Ó",
  "P",
  "Q",
  "R",
  "S",
  "Ś",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "Ź",
  "Ż",
];

function start() {
  let divContent = "";

  for (i = 0; i < 35; i++) {
    const element = "lit" + i;
    divContent =
      divContent +
      '<div class="litera" onclick="check(' +
      i +
      ')" id="' +
      element +
      '">' +
      letters[i] +
      "</div>";
    if ((i + 1) % 7 == 0) {
      divContent = divContent + '<div style="clear: both;"></div>';
    }
  }

  document.getElementById("alphabet").innerHTML = divContent;

  print_saying();
}

String.prototype.placeChar = function (place, char) {
  if (place > this.length - 1) return this.toString();
  else return this.substr(0, place) + char + this.substr(place + 1);
};

function check(nr) {
  let guessed = false;

  for (i = 0; i < length; i++) {
    if (sayingToGuess.charAt(i) == letters[nr]) {
      currentGuess = currentGuess.placeChar(i, letters[nr]);
      guessed = true;
    }
  }

  if (guessed == true) {
    yes.play();

    let element = "lit" + nr;
    document.getElementById(element).style.background = "#003300";
    document.getElementById(element).style.color = "#00C000";
    document.getElementById(element).style.border = "3px solid #00C000";
    document.getElementById(element).style.cursor = "default";
    document.getElementById(element).setAttribute("onclick", ";");

    print_saying();
  } else {
    no.play();

    element = "lit" + nr;
    document.getElementById(element).style.background = "#330000";
    document.getElementById(element).style.color = "#C00000";
    document.getElementById(element).style.border = "3px solid #C00000";
    document.getElementById(element).style.cursor = "default";
    document.getElementById(element).setAttribute("onclick", ";");

    ile_skuch++;
    let obraz = "img/s" + ile_skuch + ".jpg";
    document.getElementById("gallows").innerHTML =
      '<img src="' + obraz + '" alt="">';
  }
  if (sayingToGuess === currentGuess) {
    document.getElementById("alphabet").innerHTML =
      "Tak jest! Podano prawidłowe hasło: " +
      sayingToGuess +
      '<br/><br/><span class="reset" onclick ="location.reload()">JESZCZE RAZ?</span>';
  }

  if (ile_skuch >= 9) {
    document.getElementById("alphabet").innerHTML =
      "Przegrana! Prawidłowe hasło: " +
      sayingToGuess +
      '<br/><br/><span class="reset" onclick ="location.reload()">JESZCZE RAZ?</span>';
  }
}
