const card = document.createElement('template');
card.innerHTML = `
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

  <link
      href="https://fonts.googleapis.com/css?family=Inria+Sans|Rajdhani:400,700&display=swap"
      rel="stylesheet"
    />

  <link rel="stylesheet" href="css/styles-2.css" />

  <style>
    .card-header, .card-body {
      font-family: "Inria Sans", sans-serif;
    }

    .card {
      width: 100%;
    }
  </style>
 
  <div class="card text-center text-white bg-dark mr-10 mb-3">
    <div class="card-header">
      <h3 id="state-inf-rank"></h3>
      <h4 id="state-name"></h4>
    </div>
    <div class="card-body">
      <p id="confirmed-cases-label">Confirmed Cases</p>
      <p id="confirmed-cases-value"></p>
      <p id="reported-deaths-label">Reported Deaths</p>
      <p id="reported-deaths-value"></p>
      <p id="leading-locality-label">Leading Locality</p>
      <p id="leading-locality-value"></p>
      <a
        href="#localities-table"
        class="btn btn-outline-light btn-block view-details-btn"
        >View Details</a
      >
    </div>
  </div>


  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
`

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(card.content.cloneNode(true));
  }
  setRank() {
    this.shadowRoot.querySelector('#state-inf-rank').innerText = this.getAttribute('rank');
  }

  setName() {
    this.shadowRoot.querySelector('#state-name').innerText = this.getAttribute('name');
  }

  setCases() {
    this.shadowRoot.querySelector('#confirmed-cases-value').innerText = this.getAttribute('conf_cases');
  }

  setDeaths() {
    this.shadowRoot.querySelector('#reported-deaths-value').innerText = this.getAttribute('deaths');
  }

  setLeadingLocale() {
    this.shadowRoot.querySelector('#leading-locality-value').innerText = this.getAttribute('lead-locale');
  }

  setLocalitiesTblValues(tblData) {
    this.setAttribute('loc-tbl-data', tblData);
  }
}

window.customElements.define('user-card', UserCard)
