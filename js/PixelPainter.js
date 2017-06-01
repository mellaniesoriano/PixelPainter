function pixelPainter() {
  var currentColor = "#000000";
  var isDragging = false;
  var mode = "draw";

  var savedPixelGrid = {};

  function getCurrentColor() {
    return currentColor;
  }

  function setCurrentColor(newColor) {
    currentColor = newColor;
  }

  function getDragging() {
    return isDragging;
  }

  function setDragging(value) {
    isDragging = value;
  }

  function getMode() {
    return mode;
  }

/*  function getCoordinate(x, y) {
    var targetPixel = grid.querySelectorAll(".row")[x];
    targetPixel = targetPixel.querySelectorAll(".pixelSq")[y];
    return targetPixel;
  }
*/


  function makeGrid(width, height, pixelClass, appendTarget) {
    for (var x = 0; x < width; x++) {
      var row = document.createElement('div');
      row.className = 'row';
      for (var y = 0; y < height; y++) {
        var pixelSq = document.createElement('div');
        pixelSq.className = pixelClass;
        pixelSq.style.background = "white";
        if(pixelSq.className === "pixelSq") {
          pixelSq.id = y + "-" + x;  // has to be y,x because grid is fixed sideways.
        }
        row.appendChild(pixelSq);
      }
      appendTarget.appendChild(row);
    }
  }

  function clear() {
    var clearGrid = document.querySelectorAll('.pixelSq');
    for( var i = 0; i < clearGrid.length; i++ ) {
      clearGrid[i].style.background = "white";
    }
  }

  function erase() {
    setCurrentColor('white');
    curColorBox.style.background = getCurrentColor();
    mode = "draw";
    var paint = document.querySelector("#paintBucket");
    paint.innerHTML = "Paint";

  }

  function save() {  //saves a div identical to the current grid to a variable in the pixelPainter object.
    var getWholeGrid = document.querySelectorAll(".pixelSq");
    var pixelCounter = 0;

    savedPixelGrid = document.createElement("div");

    for(var x = 0; x < 20; x++) {
      var row = document.createElement('div');
      row.className = 'row';
      for (var y = 0; y < 20; y++) {
        var pixelSq = document.createElement('div');
        pixelSq.className = "pixelSq";
        pixelSq.style.background = getWholeGrid[pixelCounter].style.background;
        pixelCounter++;
        row.appendChild(pixelSq);
      }
      savedPixelGrid.appendChild(row);
    }

  }

  function load() {
    var displayedGrid = document.querySelectorAll(".pixelSq");
    var savedGrid = savedPixelGrid.querySelectorAll(".pixelSq");
    for(var i = 0; i < displayedGrid.length; i++) {
      displayedGrid[i].style.background = savedGrid[i].style.background;
    }
  }

  function fill() {
    var clearGrid = document.querySelectorAll('.pixelSq');
    for( var i = 0; i < clearGrid.length; i++ ) {
      clearGrid[i].style.background = getCurrentColor();
    }
  }

  function paintBucket() {
    var paintButton = document.getElementById("paintBucket");
    if(mode === "draw") {
      mode = "paintBucket";
      paintButton.innerHTML = "Draw";
    } else {
      mode = "draw";
      paintButton.innerHTML = "Paint";
    }

    //curColorBox.style.background = getCoordinate
  }

  return {
    getCurrentColor : getCurrentColor,
    setCurrentColor : setCurrentColor,
    getDragging : getDragging,
    setDragging : setDragging,
    getMode : getMode,
    makeGrid : makeGrid,
    paintBucket : paintBucket,
    clear : clear,
    erase : erase,
    save : save,
    load : load,
    fill : fill
  };
}

(function(){


  function makeDiv(id, type, append, content) {
    var newElement = document.createElement(type);
    newElement.id = id;
    newElement.innerHTML = content;
    append.appendChild(newElement);
  }

  function eventListeners(className, func) {
    var currentClass = document.querySelectorAll(className);
    for (var i = 0; i < currentClass.length; i++) {
      currentClass[i].addEventListener('click', func);
    }
  }

  function clickPixel() {
    if(pixelPainter1.getMode() === "draw") {
      this.style.background = pixelPainter1.getCurrentColor();
    } else if (pixelPainter1.getMode() === "paintBucket") {
      paintPixel(this.id, this);
    }
  }

  function paintPixel(yxCoordinate, originPixel) {
/*    var startColorTest = originPixel.attributes;
*/    var startColor = originPixel.attributes.style.value;

    function recursivePixelFill(yxCoordinate, countdown) {
      var coordinate = document.getElementById(yxCoordinate);
      if(coordinate === null ) {
        return false;
      } else if(countdown <= 0) {
        return false;
      } else {
        if(coordinate.attributes.style.value != startColor) { //end branch if hit border
          return false;
        } else if(coordinate.attributes.style.value == pixelPainter1.getCurrentColor()) { //end branch if pixel is already target color
          return false;
        } else { //else continue on
          coordinate.style.background = pixelPainter1.getCurrentColor();
          var coordinateArray = yxCoordinate.split("-");
          return recursivePixelFill(modifyCoordinate(coordinateArray, 1, 0) ,countdown-1) || recursivePixelFill(modifyCoordinate(coordinateArray, -1, 0) ,countdown-1) || recursivePixelFill(modifyCoordinate(coordinateArray, 0, 1) ,countdown-1) ||recursivePixelFill(modifyCoordinate(coordinateArray, 0, -1), countdown-1);
        }
      }
    }
    recursivePixelFill(yxCoordinate,400);
  }

  function modifyCoordinate(coordinateArray, yMod, xMod) {
    var y = Number(coordinateArray[0]) + yMod;
    var x = Number(coordinateArray[1]) + xMod;
    return (y + "-" + x);
  }

  function dragPixel() {
    if( pixelPainter1.getDragging() === true && pixelPainter1.getMode() == "draw" ) {
      this.style.background = pixelPainter1.getCurrentColor();
    }
  }

  function pickColor() { //when you click on a color tile, it makes that the new drawing color.
    pixelPainter1.setCurrentColor(this.style.background);
    curColorBox.style.background = this.style.background;
  }


  function fillColorPalette(arrayOfColors){  //fills the color pixels with ...color
    var colorGrid = document.querySelectorAll('.colorSq');
    for( var i = 0; i < arrayOfColors.length; i++ ) {
      colorGrid[i].style.background = arrayOfColors[i];
    }
  }

  function nowDragging() {
    pixelPainter1.setDragging(true);
    if(pixelPainter1.getMode() == "draw") {
      this.style.background = pixelPainter1.getCurrentColor();
    }

  }

  function notDragging() {
    pixelPainter1.setDragging(false);
  }

  var colorArray = [ '#000000', '#333333', '#555555', '#777777','#ffffff', '#00059F', '#0229BF', '#4E91FD', '#78C4FD', '#B9E2F5', '#006400', '#008B00', '#00CD00', '#00EE00', '#95F571', '#660066', '#800080', '#BE29EC', '#D896FF', '#EFBBFF', '#6F0000', '#B80000', '#D22525', '#FF6666', '#FFB9B9', '#FF4F00', '#FF6700', '#FF9248', '#FFAC00', '#FFE577', '#2E1915', '#663300', '#996633', '#BB9966', '#FFCC99'];  //set your color choice here.

  var pixelPainter1 = pixelPainter();

  var mainBody = document.getElementsByTagName('body')[0];

  var logo = document.createElement('h2');
  makeDiv('logo', 'h2', mainBody, '<b><span>P</span>ix<span>el</span> P<span>ai</span>nt<span>e</span>r');


  var mainBox = document.querySelector('#pixelPainter');
  makeDiv('sideBar', 'div', mainBox, '');
  makeDiv('grid', 'div', mainBox, '');
  makeDiv('colors', 'div', sideBar, '');
  makeDiv('sideBarChild', 'div', sideBar, '');
  makeDiv('curColorBox', 'div', sideBarChild, '');
  makeDiv('paintBucket', 'button', sideBarChild, 'Paint');
  makeDiv('eraseButton', 'button', sideBarChild, 'Erase');
  makeDiv('clearButton', 'button', sideBarChild, 'Clear');
  makeDiv('saveButton', 'button', sideBarChild, 'Save');
  makeDiv('loadButton', 'button', sideBarChild, 'Load');
  makeDiv('fillButton', 'button', sideBarChild, 'Fill');

  pixelPainter1.makeGrid(20, 20, 'pixelSq',grid); //set grid size here
  eventListeners('.pixelSq', clickPixel);

  var implementDragging = document.querySelectorAll('.pixelSq');
  for (var i = 0; i < implementDragging.length; i++) {
    implementDragging[i].addEventListener('mouseover', dragPixel);
    implementDragging[i].addEventListener("mousedown", nowDragging);
  }
  grid.addEventListener("mouseup", notDragging);


  pixelPainter1.makeGrid(7, 5,'colorSq', colors);  //set color palette size here
  eventListeners('.colorSq', pickColor);
  fillColorPalette(colorArray);

  eventListeners('#paintBucket', pixelPainter1.paintBucket);
  eventListeners('#clearButton', pixelPainter1.clear);
  eventListeners('#eraseButton', pixelPainter1.erase);
  eventListeners('#saveButton', pixelPainter1.save);
  eventListeners('#loadButton', pixelPainter1.load);
  eventListeners('#fillButton', pixelPainter1.fill);

})();


