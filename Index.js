//Variables
const icons = document.querySelectorAll("i");
let data = [];
let counter = 0;
let timezone;
let languages = [];
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
      for (const values in country.languages) {
        languages.push(country.languages[values]);
      }
      return `
    <tr class="rows" id="${counter}">
      <td>${counter}</td>
      <td><img src=${country.flags.svg} alt="${country.name.common}'s flag"</td>
      <td>${country.name.common}</td>
      <td>${country.capital}</td>
      <td>${country.population.toLocaleString().replaceAll(",", " ")}</td>
      <td>${languages.splice(0, 3).join(", ")}</td>
      <td>${country.continents}</td>
      <td>${timezone}</td>
    </tr>
    `;
    })
    .join("");
}
const sortMethod = {
  numeric: function (column, order) {
    if (order) {
      data.sort((a, b) => a.column - b.column);
    } else {
      data.sort((a, b) => b.column - a.column);
    }
  },
  alpha: function (column, order) {
    let test = column;
    if (order) {
      data.sort((a, b) => a.test.localeCompare(b.test));
    } else {
      data.sort((a, b) => b.test.localeCompare(a.test));
    }
  },
};

//Application
window.addEventListener("load", async () => {
  await fetchCountries();
  const rows = document.querySelectorAll(".rows");
  rows.forEach((row) => {
    if (row.id % 2 == 0) {
      row.style.background = "rgb(255, 206, 214)";
    } else {
      row.style.background = "rgb(143, 197, 255)";
    }
  });
});
icons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    if (e.target.classList === "active") {
      if (e.target.id === "country") {
        sortMethod.alpha(name.common, true);
      } else if (e.target.id === "capital" || "continent") {
        sortMethod.alpha(e.target.id, true);
      } else if (e.target.id === "population") {
        sortMethod.numeric(population, true);
      }
    } else {
      icons.forEach((icon) => {
        icon.classList.remove("active");
      });
      e.target.classList.add("active");
      if (e.target.id === "country") {
        sortMethod.alpha(name.common, false);
      } else if (e.target.id === "capital" || "continent") {
        sortMethod.alpha(e.target.id, false);
      } else if (e.target.id === "population") {
        sortMethod.numeric(population, false);
      }
    }
  });
});
