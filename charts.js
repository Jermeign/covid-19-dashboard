// Set Global Variable(s)

// Get API Data

function getData(usps) {
  return new Promise((resolve, reject) => {
    fetch('https://covidtracking.com/api/v1/states/daily.json')
      .then(res => res.json())
      .then(data => {
        const arr = Array.from(data).filter(state => state.state == usps).filter(state => state.death !== undefined).sort((a, b) => a.date - b.date);

        return resolve(arr);
      })
  })
};

google.charts.load('current', { 'packages': ['corechart', 'line', 'bar'] });

function initCharts(x) {
  getData(x)
    .then(data => {
      google.charts.setOnLoadCallback(drawConfChart(data));
      google.charts.setOnLoadCallback(drawTestingChart(data));
      google.charts.setOnLoadCallback(drawChangeChart(data));
      google.charts.setOnLoadCallback(drawConvRateChart(data));
    })
}



function drawConfChart(arr) {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Conf. Cases');
  data.addColumn('number', 'Rep. Deaths');

  arr.forEach(day => {
    data.addRow([new Date(formatDate(day.date)), day.positive, day.death])
  });
  var options = {
    title: `State of ${arr[0].state}:  Confirmed Cases vs. Reported Deaths`,
    titleTextStyle: {
      color: '#888',
      fontSize: 18
    },
    subtitle: `Refreshed On: ${new Date()}`,
    curveType: 'none',
    width: 635,
    height: 400,
    hAxis: { textStyle: { color: '#888' }, gridlines: { color: 'transparent' } },
    vAxis: { textStyle: { color: '#888' } },
    legend: {
      textStyle: { color: '#888' },
      position: 'bottom',
    },
    animation: {
      startup: true,
      easing: 'inAndOut',
      duration: 2000
    },

    backgroundColor: { fill: 'transparent' }
  };

  var chart = new google.visualization.AreaChart(document.getElementById('conf-death-chart'));

  chart.draw(data, options);
}

function drawTestingChart(arr) {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Cumulative Tests');
  // data.addColumn('number', 'Conf. Cases');
  data.addColumn('number', 'Daily Tests');

  arr.forEach(day => {
    data.addRow([new Date(formatDate(day.date)), day.total, day.totalTestResultsIncrease])
  });
  var options = {
    title: `State of ${arr[0].state}:  Cumulative Tests vs. Daily Testing`,
    titleTextStyle: {
      color: '#888',
      fontSize: 18
    },
    width: 635,
    height: 400,
    curveType: 'function',
    hAxis: { textStyle: { color: '#888' }, gridlines: { color: 'transparent' } },
    vAxis: { textStyle: { color: '#888' } },
    legend: {
      textStyle: { color: '#888' },
      position: 'bottom',
    },
    animation: {
      startup: true,
      easing: 'inAndOut',
      duration: 2000
    },

    backgroundColor: { fill: 'transparent' }
  };

  var chart = new google.visualization.AreaChart(document.getElementById('testing-chart'));

  chart.draw(data, options);
}

function drawChangeChart(arr) {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Conf. Cases (+ / -)');
  data.addColumn('number', 'Deaths (+ / -)');

  arr.forEach(day => {
    data.addRow([new Date(formatDate(day.date)), day.positiveIncrease, day.deathIncrease])
  });
  var options = {
    title: `State of ${arr[0].state}:  Daily Inc / Dec of Cases and Deaths`,
    titleTextStyle: {
      color: '#888',
      fontSize: 18
    },
    width: 635,
    height: 400,
    subtitle: `Refreshed On: ${new Date()}`,
    curveType: 'function',
    hAxis: { textStyle: { color: '#888' }, gridlines: { color: 'transparent' } },
    vAxis: { textStyle: { color: '#888' } },
    legend: {
      position: 'bottom',
      textStyle: { color: '#888' },
    },
    animation: {
      startup: true,
      easing: 'inAndOut',
      duration: 2000
    },

    backgroundColor: { fill: 'transparent' }
  };

  var chart = new google.visualization.AreaChart(document.getElementById('change-chart'));

  chart.draw(data, options);
}

function drawConvRateChart(arr) {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Conv. Rate (%)');

  arr.forEach(day => {
    if (getPercentage([day.positiveIncrease, day.totalTestResultsIncrease], 2) < 1) {
      data.addRow([new Date(formatDate(day.date)), getPercentage([day.positiveIncrease, day.totalTestResultsIncrease], 2)]);
    }

  });
  var options = {
    title: `State of ${arr[0].state}:  Rate of Conversion of Daily Testing`,
    titleTextStyle: {
      color: '#888',
      fontSize: 18
    },
    width: 635,
    height: 400,
    hAxis: { textStyle: { color: '#888' }, gridlines: { color: 'transparent' } },
    vAxis: {
      minValue: 0,
      format: '# %',
      textStyle: { color: '#888' },
    },
    animation: {
      startup: true,
      easing: 'inAndOut',
      duration: 2000
    },
    legend: { position: 'bottom', textStyle: { color: '#888' } },
    backgroundColor: { fill: 'transparent' }
  };

  var chart = new google.visualization.ColumnChart(document.getElementById('conv-rate-chart'));

  chart.draw(data, options);
}

function formatDate(num) {
  s = num.toString();
  return [s.slice(0, 4), s.slice(4, 6), s.slice(6, 8)].join('-');
}

function getPercentage(nums, prec) {
  return +(nums[0] / nums[1]).toFixed(prec);
}




