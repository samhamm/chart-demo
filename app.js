'use strict';

var allSongs = [];

function Song(title, votes) {
  this.title = title;
  this.votes = votes;
  allSongs.push(this);
}

var purpleRain = new Song('Purple Rain', 12);
var letsWork = new Song('Let\'s Work', 2);
var dmsr = new Song('DMSR', 3);
var mountains = new Song ('Mountains', 5);
var uGotTheLook = new Song('U Got The Look', 1);

// (function showSongsAsList() {
//   var songList = document.getElementById('songs');
//   for (var i = 0; i < allSongs.length; i++){
//     var liEl = document.createElement('li');
//     liEl.textContent = allSongs[i].title + ', ' + allSongs[i].votes + ' votes';
//     songList.appendChild(liEl);
//   };
// })();

// Arrays to hold data for the chart
var votes = [];
var titles = [];

// For loop to populate those arrays from the array of objects
for (var i = 0; i < allSongs.length; i++) {
  titles.push(allSongs[i].title);
  votes.push(allSongs[i].votes);
}

// Data structure for the chart
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
  var ctx = document.getElementById('song-chart').getContext('2d');
  // new Chart(songChart)...

  var songChart = new Chart(ctx,{
    type: 'pie',
    data: data,
    options: {
      responsive: false
    }
  });
}

document.getElementById('funky').addEventListener('click', function(){
  drawChart();
});

console.table(allSongs);
