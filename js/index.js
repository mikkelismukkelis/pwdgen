const copyOkAlert = document.getElementById('copyOkAlert')

let pwdLength = document.getElementById('pwdLength').value

const randomPwdField = document.getElementById('randomPassword')
const generateBtn = document.getElementById('generateBtn')
const copyBtn = document.getElementById('copyBtn')
const settingsBtn = document.getElementById('settingsBtn')

let language = document.getElementById('langSelection').value
const wordsPwdField = document.getElementById('wordsPassword')
const copyBtnWords = document.getElementById('copyBtnWords')
const generateWordsBtn = document.getElementById('generateBtnWords')


const alphabetsSmall = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const alphabetsCapital = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const numbers = ["2","3","4","5","6","7","8","9"]
const specials = ["!","#","$","%","&","(",")","*","+","-","=","?","<",">","@","_"]
let charsForGeneration = []

// Words for testing locally
// let englishWords = ["Wood", "Funny", "Dog", "Strange", "Elephant"]
// let finnishWords = ["Puu", "Hauska", "Koira", "Outo", "Norsu", "Kiva", "Kaunis", "Nauru", "Kuusi", 
// "Aamu", "Naama", "Joulu", "Syksy", "Jeppis", "Tuisku", "Vaaka", "Laaja", "Faarao", "Vanhus", "Mahtava"]
let englishWords = []
let finnishWords = []




generateBtn.addEventListener('click', generatePwd)
copyBtn.addEventListener('click', copyToClipboard)
settingsBtn.addEventListener('click', showHideSettins)

generateBtnWords.addEventListener('click', generatePwdWords)
copyBtnWords.addEventListener('click', copyToClipboardWords)


function showHideSettins() {
  let x = document.getElementById("settingsDiv");
  if (x.hidden === true) {
    x.hidden = false
  } else {
    x.hidden = true
  }
}



function generatePwd() {

  checkPasswordSettings()
  let password = ''

  for (i = 0; i < pwdLength; i++) {
    password += charsForGeneration[Math.floor(Math.random() * charsForGeneration.length)]
  }

  randomPwdField.value = password

  // Let's clear character for generation array
  charsForGeneration = []
}


// Populates characters used in password generation according to selections
function checkPasswordSettings() {
     
  let characters = document.getElementsByName('characters');
  let selected = [];


  for (let i=0; i<characters.length; i++) {
      if (characters[i].checked) {
        selected.push(1)
      } else {
        continue
        // selected.push(0);
      }
  }

  //if no selection at all >> alert

  if (selected.length == 0) {
    alert("No character selection, select at least one!")
    return
  }

  for (let i=0; i < selected.length; i++) {
    if (i == 0 && selected[i] == 1 ) {
      charsForGeneration = charsForGeneration.concat(alphabetsSmall)
    }

    if (i == 1 && selected[i] == 1 ) {
      charsForGeneration = charsForGeneration.concat(alphabetsCapital)
    }

    if (i == 2 && selected[i] == 1 ) {
      charsForGeneration = charsForGeneration.concat(numbers)
    }

    if (i == 3 && selected[i] == 1 ) {
      charsForGeneration = charsForGeneration.concat(specials)
    }
  }

}


function copyToClipboard() {
  // Select password and copy to clipboard
  let copyText = document.getElementById("randomPassword")
  copyText.select();
  document.execCommand("copy");

  // Show copy ok alert
  copyOkAlert.style.visibility = 'visible'
}


function generatePwdWords() {
  let password = ''
  let usedDictionary = []
  language = document.getElementById('langSelection').value

  // console.log(finnishWords.length)

  if (language == 'FI') {
    usedDictionary = finnishWords
  } else {
    usedDictionary = englishWords
  }

  let word1 = usedDictionary[Math.floor(Math.random() * usedDictionary.length)]
  let word2 = usedDictionary[Math.floor(Math.random() * usedDictionary.length)]
  let specialChar = specials[Math.floor(Math.random() * specials.length)]
  let number = numbers[Math.floor(Math.random() * numbers.length)]

  password = word1 + word2 + specialChar + number

  wordsPwdField.value = password

}

function copyToClipboardWords() {
  // Select password and copy to clipboard
  let copyText = document.getElementById("wordsPassword")
  copyText.select();
  document.execCommand("copy");

  // Show copy ok alert
  copyOkAlert.style.visibility = 'visible'

}


// For updating slider value to div
let elem = document.querySelector('input[type="range"]')
let rangeValue = function() {
  let newValue = elem.value
  let target = document.querySelector('.value')
  target.innerHTML = "Password length: " + newValue;
  pwdLength = newValue;
}

elem.addEventListener("input", rangeValue);


$(document).ready(function(){

  // To show copy ok alert
  $("#copyBtn").click(function showAlert() {
    $("#copyOkAlert").fadeTo(2000, 500).slideUp(500, function(){
      $("#copyOkAlert").slideUp(500);
    });
  });

  // To show copy ok alert - WORD generation
  $("#copyBtnWords").click(function showAlert() {
    $("#copyOkAlert").fadeTo(2000, 500).slideUp(500, function(){
      $("#copyOkAlert").slideUp(500);
    });
  });  

  // Load finnish words to array
  $.get( "js/finnish_words.txt", function( data ) {
    finnishWords = data.split("\n");
  });


// Load english words to array
  $.get( "js/english_words.txt", function( data ) {
    englishWords = data.split("\n");
    // console.log(englishWords[0])
  });


  // Generate passwords on page load
  generatePwd();

  //Need to delay because of words loading to array
  setTimeout(function(){
    generatePwdWords()
  }, 500);
  



});


