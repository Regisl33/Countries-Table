//Variables
const rows = document.querySelectorAll("tr");
let data = [];
let counter = 0;
let timezone;
//Functions
async function fetchCountries() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((res) => (data = res));
  console.log(data);
  displayCountries();
}
function displayCountries() {
  displayData.innerHTML = data
    .sort((a, b) => b.population - a.population)
    .map((country) => {
      counter++;
      if (country.timezones.length === 1) {
        timezone = `${country.timezones[0]}`;
      } else {
        timezone = `From ${country.timezones[0]} to ${
          country.timezones[country.timezones.length - 1]
        }`;
      }
      return `
    <tr id="${counter}">
      <td>${counter}</td>
      <td><img src=${country.flags.svg} alt="${country.name.common}'s flag"</td>
      <td>${country.name.common}</td>
      <td>${country.capital}</td>
      <td>${country.population.toLocaleString().replaceAll(",", " ")}</td>
      <td>${country.languages}</td>
      <td>${country.continents}</td>
      <td>${timezone}</td>
    </tr>
    `;
    })
    .join("");
}
window.addEventListener("load", async () => {
  await fetchCountries();
  rows.forEach((row) => {
    if (row.id) {
    }
  });
});
