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
    switch (e.target.id) {
      case "country":
        if (e.target.classList === "active") {
          data.sort((a, b) => b.name.common.LocaleCompare(a.name.common));
        } else {
          icons.forEach((icon) => {
            icon.classList.remove("active");
          });
          e.target.classList.add("active");
          data.sort((a, b) => a.name.common.LocaleCompare(b.name.common));
        }
      case "capital":
        if (e.target.classList === "active") {
          data.sort((a, b) => b.capital.LocaleCompare(a.capital));
        } else {
          icons.forEach((icon) => {
            icon.classList.remove("active");
          });
          e.target.classList.add("active");
          data.sort((a, b) => a.capital.LocaleCompare(b.capital));
        }
      case "population":
        if (e.target.classList === "active") {
          data.sort((a, b) => b.population - a.population);
        } else {
          icons.forEach((icon) => {
            icon.classList.remove("active");
          });
          e.target.classList.add("active");
          data.sort((a, b) => a.population - b.population);
        }
      case "continent":
        if (e.target.classList === "active") {
          data.sort((a, b) => b.continent.LocaleCompare(a.continent));
        } else {
          icons.forEach((icon) => {
            icon.classList.remove("active");
          });
          e.target.classList.add("active");
          data.sort((a, b) => a.continent.LocaleCompare(b.continent));
        }
    }
  });
});
