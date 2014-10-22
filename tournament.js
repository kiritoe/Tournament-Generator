// #############################################################################
// ## INITIALIZE ###############################################################
// #############################################################################
window.onload = function() {
  createTournament(3, 1);
}

function createTournament(playern, mode) {
  createTable(tournament);
}

// #############################################################################
// ## VIEW #####################################################################
// #############################################################################
var table = null;

var tournament = [
  //   0     1     2     3     4     5     6     7      8
  [ '__', '__', 'p1', '#.', '__', '__', '__', '__', '__' ],  // 0
  [ '__', '__', '__', '#;', '__', '__', '__', '__', '__' ],  // 1
  [ 'p2', '#.', 'mB', '#-', 'wB', '#.', '__', '__', '__' ],  // 2
  [ '__', '#;', '__', '#;', '__', '#;', '__', '__', '__' ],  // 3
  [ 'mA', '#-', 'wA', '#.', '__', '#;', '__', '__', '__' ],  // 4
  [ '__', '#;', '__', '__', '__', '#;', '__', '__', '__' ],  // 5
  [ 'p3', '#.', '__', '__', 'mD', '#-', 'wD', '#.t', '__' ], // 6
  [ '__', '__', '__', '__', '__', '#;', '__', '#;t', '__' ], // 7
  [ '__', '__', 'lA', '#.', '__', '#;', '__', '#;t', '__' ], // 8
  [ '__', '__', '__', '#;', '__', '#;', 'mE', '#-t', 'wE' ], // 9
  [ '__', '__', 'mC', '#-', 'wC', '#.', '__', '#;t', '__' ], // 10
  [ '__', '__', '__', '#;', '__', '__', '__', '#;t', '__' ], // 11
  [ '__', '__', 'lB', '#.', '__', '__', 'lD', '#.t', '__' ], // 12
];



function createTable(tournament) {
  table = document.getElementById('table-players');
  for (var y = 0; y < tournament.length; y++) {
    var row = table.insertRow(y);
    for (var x = 0; x < tournament[y].length; x++) {
      var cell = row.insertCell(x),
          child = populateCell(tournament[y][x]);
      if (child) cell.appendChild(child);
    }
  }
}

function populateCell(type) {
  switch (type[0]) {
    case '_' : return null;
    case 'm' : return makeMatchLabel(type[1]);
    case '#' : return makeCssBall(type);
    default  : return makeTextbox(type[0], type[1]);
  }
}

function makeTextbox(type, index) {
  var hint,
      textbox = document.createElement('input');
  textbox.type = 'input';
  textbox.className = 'box-player';
  textbox.onblur = null;
  switch (type) {
     case 'p' : hint = 'Giocatore '; break;
     case 'l' : hint = 'Perdente ' ; break;
     case 'w' : 
     default  : hint = 'Vincitore '; break;
  }
  textbox.placeholder = hint + index;
  return textbox;
}

function makeMatchLabel(match) {
  var label = document.createElement('div');
  label.className = 'label-match';
  label.style.textAlign = 'center';
  label.innerHTML = 'Partita '  + match;
  return label;
}

function makeCssBall(type) {
  var div = document.createElement('div'),
      pattern;
  switch (type[1]) {
    case '.' : pattern = 'bbe'; break; 
    case '-' : pattern = 'ebb'; break;
    case ';' : pattern = 'ebe'; break;
  }

  for (var i = 0; i < pattern.length; i++) {
    var container = document.createElement('div');
    container.display = 'inline-block';
    container.width = '50px';
    container.height = '50px';
    var ball = document.createElement('div');
    ball.className = 'css-ball';
    if (pattern[i] === 'e') ball.className += ' empty-css-ball';
    else if (type.length === 3) ball.className += ' trans-css-ball';
    container.appendChild(ball);
    div.appendChild(ball);
  }
  return div;
}

// #############################################################################
// ## MODEL ####################################################################
// #############################################################################
var matches = [
  [ 0, 2,   0, 6,   2,  4,   2,  8,  1, 0 ],
  [ 2, 0,   2, 4,   4,  2,   2, 12,  2, 0 ],
  [ 2, 8,   2, 12,  4, 10,  -1, -1,  3, 0 ],
  [ 4, 2,   4, 10,  6,  6,   6, 12,  4, 1 ],
  [ 6, 6,   6, 12,  8,  9,  -1, -1,  5, 2 ],
];

function getPlayerAt(x, y) { return table.rows[y].cells[x].childNodes[0].value; }

function matchToString(match) {

  function player(i) { return getPlayerAt(match[i], match[i+1]); }

  return player(0) + ' VS ' + player(2) + ' | v:' + player(4) + ' p:' + player(6);
}

function saveTournament() {
  var score = document.getElementById('div-score');
  matches.forEach(function(match) {
    score.innerHTML += matchToString(match) + '<br>';
  });
}


