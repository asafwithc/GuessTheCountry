let guessBtn = document.getElementById("guess-btn");
let countryInp = document.getElementById("country-inp");
let flagImg = document.getElementById("flag-img");
let statu = document.getElementById("status");

let countries = ["germany", "poland", "turkey", "united states",
"india", "peru", "greece", "netherlands", "france", "italy",
"monaco", "mexico"];

let selectedCountry = "";

// Displays flag of a random country
function bringCountry(){
  selectedCountry = countries[Math.floor(Math.random()*countries.length)]; 
  let url = `https://restcountries.com/v3.1/name/${selectedCountry}?fullText=true`;
  fetch(url).then((response) => response.json())
                .then((data) => {
                  flagImg.src = data[0].flags.png;
                })
  
  countries.splice(countries.indexOf(selectedCountry),1);
}

function checkFillment(){
  if(countries.length != 0){
    bringCountry();
    setTimeout(() => (statu.innerHTML = "Guess the COUNTRY!!!"), 1000);
  }
}

checkFillment();
let trueCnt = 0;
let falseCnt = 0;

let last = true;

guessBtn.addEventListener("click", () => {
    
    let guessedCountry = countryInp.value;
    if(countries.length == 0){
        if(last){
          let varia = guessedCountry == selectedCountry ? trueCnt++ : falseCnt++;
          last = false;
        }
        statu.innerHTML = `You got ${trueCnt} flags right and ${falseCnt} flags false`;
        flagImg.src = "";
    }else if(guessedCountry == selectedCountry){
      statu.innerHTML = `Congratss you got it right!!`;
      trueCnt++;
      checkFillment();
    }else if(guessedCountry != selectedCountry){
      statu.innerHTML = `Sorry you got it false :((`;
      falseCnt++;
      checkFillment();
    }  
    countryInp.value = "";
})

countryInp.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    guessBtn.click();
  }
});