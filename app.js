'use strict';
// Get into the habit of putting 'use strict' in all of the JS you write

// ++++++++++++++++++++++++++++++++++++++++++++
// DATA - Variable declarations
// ++++++++++++++++++++++++++++++++++++++++++++

var allSongs = [];
var totalVotes = 0;
var songChart;
var chartDrawn = false;

// Arrays to hold data for the chart
var votes = [];
var titles = [];

// ++++++++++++++++++++++++++++++++++++++++++++
// DATA - Constructor and instances
// ++++++++++++++++++++++++++++++++++++++++++++

function Song(title, votes, identifier) {
  this.title = title;
  this.votes = votes;
  this.identifier = identifier;
  allSongs.push(this);
}

var purpleRain = new Song('Purple Rain', 0, 'purplerain');
var letsWork = new Song('Let\'s Work', 0, 'letswork');
var dmsr = new Song('DMSR', 0, 'dmsr');
var mountains = new Song ('Mountains', 0, 'mountains');
var starfishandcoffee = new Song('Starfish and Coffee', 0, 'starfish');

// ++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
// ++++++++++++++++++++++++++++++++++++++++++++

function updateChartArrays() {
  for (var i = 0; i < allSongs.length; i++) {
    titles[i] = allSongs[i].title;
    votes[i] = allSongs[i].votes;
  }
}

function showSongsAsList() {
  var songList = document.getElementById('funky-list');
  songList.innerHTML = '';
  songList.hidden = false;
  for (var i = 0; i < allSongs.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = allSongs[i].title + ', ' + allSongs[i].votes + ' votes';
    songList.appendChild(liEl);
  };
};

function tallyVote(thisSong) {
  for (var i = 0; i < allSongs.length; i++) {
    if (thisSong === allSongs[i].identifier) {
      allSongs[i].votes++;
      localStorage.setItem('songsData', JSON.stringify(allSongs));
      localStorage.setItem('titles', JSON.stringify(titles));
      localStorage.setItem('votes', JSON.stringify(votes));
      updateChartArrays();
    }
  }
}

// ++++++++++++++++++++++++++++++++++++++++++++
// CHART STUFF
// ++++++++++++++++++++++++++++++++++++++++++++

var data = {
  labels: titles,
  datasets: [
    {
      data: votes,
      backgroundColor: [
        'bisque',
        'darkgray',
        'burlywood',
        'lightblue',
        'darkseagreen'
      ],
      hoverBackgroundColor: [
        'purple',
        'purple',
        'purple',
        'purple',
        'purple'
      ]
    }]
};

function drawChart() {
  var ctx = document.getElementById('funky-chart').getContext('2d');
  songChart = new Chart(ctx,{
    type: 'pie',
    data: data,
    options: {
      responsive: false
    }
  });
  chartDrawn = true;
}

function hideChart() {
  document.getElementById('funky-chart').hidden = true;
}
// ++++++++++++++++++++++++++++++++++++++++++++
// EVENT LISTENERS
// ++++++++++++++++++++++++++++++++++++++++++++

document.getElementById('draw-chart').addEventListener('click', function(){
  drawChart();
  // setTimeout(hideChart, 5000);
});

document.getElementById('list-button').addEventListener('click', function(){
  showSongsAsList();
});

document.getElementById('funky-list').addEventListener('click', function(){
  document.getElementById('funky-list').hidden = true;
});

document.getElementById('voting').addEventListener('click', function(event){
  if (event.target.id !== 'voting') {
    tallyVote(event.target.id);
  };

  if (chartDrawn) {
    songChart.update();
  }
});

// console.table(allSongs);

// ++++++++++++++++++++++++++++++++++++++++++++
// HERE'S THE LOCAL STORAGE BITS THAT WE NEED
// ++++++++++++++++++++++++++++++++++++++++++++

//
(function checkLocal() {
  if (localStorage.songsData) {
    console.log('Local storage exists');
    var parsedSongsData = JSON.parse(localStorage.songsData);
    allSongs = parsedSongsData;
    updateChartArrays();
  } else {
    console.log('Local storage doesn\'t exist');
  }
})();

document.getElementById('lazyass').addEventListener('click', function(){
  localStorage.clear();
});
