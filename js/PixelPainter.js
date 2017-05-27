function pixelPainter() {
  function makeGrid(width, height) {
    for (var x = 0; x < width; x++) {
      var row = document.createElement('div');
      row.className = 'row';
      for (var y = 0; y < height; y++) {
        var pixelSq = document.createElement('div');
        pixelSq.className = 'pixelSq';
        pixelSq.innerHTML = '[ ]';
        row.appendChild(pixelSq);
      }
      grid.appendChild(row);
    }
  }
  return {
    makeGrid : makeGrid
  };
}

var mainBox = document.querySelector('#pixelPainter');

function makeDiv(id, type, append, content) {
  var newElement = document.createElement(type);
  newElement.id = id;
  newElement.innerHTML = content;
  append.appendChild(newElement);
}

function eventListeners(className, func) {
  var currentClass = document.querySelectorAll(className);
  console.log(currentClass.length);
  for (var i = 0; i < currentClass.length; i++) {
    console.log('hi');
    currentClass[i].addEventListener('click', func);
  }
}

function test() {
  alert('hi');
}

makeDiv('grid', 'div', mainBox, 'grid');
makeDiv('sideBar', 'div', mainBox, 'sideBar');
makeDiv('colors', 'div', sideBar, 'colors');
makeDiv('eraseButton', 'div', sideBar, 'eraseButton');
makeDiv('clearButton', 'div', sideBar, 'clearButton');



var pixelPainter1 = pixelPainter();
pixelPainter1.makeGrid(3, 3);
eventListeners('.pixelSq', test);