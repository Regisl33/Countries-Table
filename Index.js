//Variables
let data = [];
//Functions
async function fetchCountries() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((res) => (data = res));

  console.log(data);
}

fetchCountries();
