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

function showSongsAsList() {
  var songList = document.getElementById('songs');
  for (var i = 0; i < allSongs.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = allSongs[i].title + ', ' + allSongs[i].votes + ' votes';
    songList.appendChild(liEl);
  };
};

var titles = [];
for (var i = 0; i < allSongs.length; i++) {
  titles.push(allSongs[i].title);
}

var votes = [];
for (var i = 0; i < allSongs.length; i++) {
  votes.push(allSongs[i].votes);
}

var data = {
    labels: titles,
    datasets: [
        {
            data: votes,
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
};

var songChart = document.getElementById('song-chart').getContext('2d');
// new Chart(songChart)...

var myPieChart = new Chart(songChart,{
    type: 'pie',
    data: data,
    // options: options
});




console.table(allSongs);
showSongsAsList();
// What if we wanted to use an IIFE instead?
