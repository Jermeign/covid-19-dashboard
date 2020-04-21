let states = [];

fetch("https://covid19.mathdro.id/api", {
  "method": "GET"
})
  .then(response => response.json())
  .then((data) => {
    document.getElementById('glb-conf-cases').innerText = formatNumber(data.confirmed.value);
    document.getElementById('glb-deaths').innerText = formatNumber(data.deaths.value);
    // document.getElementById('glb-new-deaths').innerText = formatNumber(data.data.deaths_diff);
    // document.getElementById('glb-mortality').innerText = `${data.data.fatality_rate * 100}%`
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });

fetch("https://covid-19-statistics.p.rapidapi.com/reports?iso=USA", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
    "x-rapidapi-key": "b03d7d572amshc95be450b16561cp1af1ccjsn4db1b677c5d4",
  },
})
  .then((response) => response.json())
  .then((data) => {
    states = Array.from(data.data).sort((a, b) => b.confirmed - a.confirmed);
    // console.log(states);
    calcAggregation(states);
    addAPIDataToDOM(states);
  })
  .catch((err) => {
    console.log(err);
  });

function calcAggregation(states) {
  // Declare Variables
  const conf_cases = states.reduce((acc, item) => acc + item.confirmed, 0);

  const new_cases = formatNumber(states.reduce((acc, item) => acc + item.confirmed_diff, 0));

  const conf_deaths = states.reduce((acc, item) => acc + item.deaths, 0);

  const new_deaths = formatNumber(states.reduce((acc, item) => acc + item.deaths_diff, 0));

  const filtered_states = states.filter(state => state.confirmed <= 50000);

  // Domestic Confirmed Cases
  document.getElementById('dom-conf-cases').innerText = formatNumber(conf_cases);
  // Domestic New Cases
  document.getElementById('dom-new-cases').innerText = new_cases;
  // Domestic Confirmed Deaths
  document.getElementById('dom-deaths').innerText = formatNumber(conf_deaths);
  // Domestic New Deaths
  document.getElementById('dom-new-deaths').innerText = new_deaths;

  // Mortality Rate

  document.getElementById('dom-mortality').innerText = `${((conf_deaths / conf_cases) * 100)
    .toFixed(2)} % `;

  // Avg Domestic Confirmed Cases

  document.getElementById('aggr-confirmed-cases').innerText = formatNumber((filtered_states.reduce((acc, item) => acc + item.confirmed, 0) / filtered_states.length).toFixed(2));

  document.getElementById('aggr-new-cases').innerText = (filtered_states.reduce((acc, item) => acc + item.confirmed_diff, 0) / filtered_states.length).toFixed(2);

  document.getElementById('aggr-confirmed-deaths').innerText = (filtered_states.reduce((acc, item) => acc + item.deaths, 0) / filtered_states.length).toFixed(2);

  document.getElementById('aggr-new-deaths').innerText = (filtered_states.reduce((acc, item) => acc + item.deaths_diff, 0) / filtered_states.length).toFixed(2);

  // document.getElementById('aggr-mort-rate').innerText = `
  //   ${(filtered_states.reduce((acc, item) => acc + item.fatility_rate) / states.length, 0) * 100} %
  // `
}



// ***** Add API Data To DOM *****

function addAPIDataToDOM(states) {

  const container_1 = document.getElementById('cd-1');
  const container_2 = document.getElementById('cd-2');
  const container_3 = document.getElementById('cd-3');
  const container_4 = document.getElementById('cd-4');
  const container_5 = document.getElementById('cd-5');

  for (var i = 0; i < 15; i++) {
    if (i < 3) {
      // Create Custom Card Element

      let card = document.createElement('user-card');
      // Set Custom Card Attributes

      card.setAttribute("rank", `No. ${i + 1}`);
      card.setRank();
      card.setAttribute("name", states[i].region.province);
      card.setName();
      card.setAttribute("conf_cases", formatNumber(states[i].confirmed));
      card.setCases();
      card.setAttribute("deaths", formatNumber(states[i].deaths));
      card.setDeaths();
      card.setAttribute("lead-locale", getLeadingLocale(states[i]));
      card.setLeadingLocale();
      card.setLocalitiesTblValues(JSON.stringify(states[i].region.cities.sort((a, b) => b.confirmed - a.confirmed)));

      // Append Card to Deck 1

      container_1.appendChild(card);

      // Add Event Listener to Button

      const button = card.shadowRoot.children[4].children[1].children[6];
      button.addEventListener('click', function () { fillLocalitiesTbl(card, states[i]); })



    } else if (i > 2 && i < 6) {
      // Create Custom Card Element

      let card = document.createElement('user-card');

      // Set Custom Card Attributes

      card.setAttribute("rank", `No. ${i + 1}`);
      card.setRank();
      card.setAttribute("name", states[i].region.province);
      card.setName();
      card.setAttribute("conf_cases", formatNumber(states[i].confirmed));
      card.setCases();
      card.setAttribute("deaths", formatNumber(states[i].deaths));
      card.setDeaths();
      card.setAttribute("lead-locale", getLeadingLocale(states[i]));
      card.setLeadingLocale();
      card.setLocalitiesTblValues(JSON.stringify(states[i].region.cities.sort((a, b) => b.confirmed - a.confirmed)));

      // Add Event Listener to Button

      container_2.appendChild(card);

      // Add Event Listener to Button

      const button = card.shadowRoot.children[4].children[1].children[6];
      button.addEventListener('click', function () { fillLocalitiesTbl(card, states[i]); })

    } else if (i > 5 && i < 9) {
      // Create Custom Card Element

      let card = document.createElement('user-card');
      // Set Custom Card Attributes

      card.setAttribute("rank", `No. ${i + 1}`);
      card.setRank();
      card.setAttribute("name", states[i].region.province);
      card.setName();
      card.setAttribute("conf_cases", formatNumber(states[i].confirmed));
      card.setCases();
      card.setAttribute("deaths", formatNumber(states[i].deaths));
      card.setDeaths();
      card.setAttribute("lead-locale", getLeadingLocale(states[i]));
      card.setLeadingLocale();
      card.setLocalitiesTblValues(JSON.stringify(states[i].region.cities.sort((a, b) => b.confirmed - a.confirmed)));

      // Append Card to Deck 3

      container_3.appendChild(card);

      // Add Event Listener to Button

      const button = card.shadowRoot.children[4].children[1].children[6];
      button.addEventListener('click', function () { fillLocalitiesTbl(card, states[i]); })

    } else if (i > 8 && i < 12) {

      // Create Custom Card Element

      let card = document.createElement('user-card');
      // Set Custom Card Attributes

      card.setAttribute("rank", `No. ${i + 1}`);
      card.setRank();
      card.setAttribute("name", states[i].region.province);
      card.setName();
      card.setAttribute("conf_cases", formatNumber(states[i].confirmed));
      card.setCases();
      card.setAttribute("deaths", formatNumber(states[i].deaths));
      card.setDeaths();
      card.setAttribute("lead-locale", getLeadingLocale(states[i]));
      card.setLeadingLocale();
      card.setLocalitiesTblValues(JSON.stringify(states[i].region.cities.sort((a, b) => b.confirmed - a.confirmed)));

      // Append Card to Deck 4

      container_4.appendChild(card);

      // Add Event Listener to Button

      const button = card.shadowRoot.children[4].children[1].children[6];
      button.addEventListener('click', function () { fillLocalitiesTbl(card, states[i]); })

    } else {

      // Create Custom Card Element

      let card = document.createElement('user-card');
      // Set Custom Card Attributes

      card.setAttribute("rank", `No. ${i + 1}`);
      card.setRank();
      card.setAttribute("name", states[i].region.province);
      card.setName();
      card.setAttribute("conf_cases", formatNumber(states[i].confirmed));
      card.setCases();
      card.setAttribute("deaths", formatNumber(states[i].deaths));
      card.setDeaths();
      card.setAttribute("lead-locale", getLeadingLocale(states[i]));
      card.setLeadingLocale();
      card.setLocalitiesTblValues(JSON.stringify(states[i].region.cities.sort((a, b) => b.confirmed - a.confirmed)));

      // Append Card to Deck 5

      container_5.appendChild(card);

      // Add Event Listener to Button

      const button = card.shadowRoot.children[4].children[1].children[6];
      button.addEventListener('click', function () { fillLocalitiesTbl(card, states[i]); })
    }
  }
}

// Utilities 

function getLeadingLocale(state) {
  const localities = Array.from(state.region.cities.sort((a, b) => b.confirmed - a.confirmed));

  return localities[0].name;
}

function fillLocalitiesTbl(card, state) {
  //Update Div Header Text w/ State Name
  document.getElementById('localities-st-dec').innerText = ` (${card.getAttribute('name')})`;

  //Fill Table w/ 'Cities' Data
  const tbl_body = document.getElementById('localities-table-body');

  if (tbl_body.childNodes.length > 0) {
    Array.from(tbl_body.children).forEach(row => {
      tbl_body.removeChild(row);
    })
  }

  const cities = JSON.parse(card.getAttribute('loc-tbl-data')).slice(0, 10);
  Array.from(cities).forEach(city => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${city.name}</td>
      <td>${city.confirmed}</td>
      <td>${city.confirmed_diff}</td>
      <td>${city.deaths}</td>
      <td>${city.deaths_diff}</td>
      <td>${((city.deaths / city.confirmed) * 100).toFixed(2)}%</td>
    `
    tbl_body.appendChild(row);
  })
}

function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}