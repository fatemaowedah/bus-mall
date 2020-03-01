'use strict'
var product = [
    'bag',
    'banana',
    'bathroom',
    'boots',
    'breakfast',
    'bubblegum',
    'chair',
    'cthulhu',
    'dog-duck',
    'dragon',
    'pen',
    'pet-sweep',
    'scissors',
    'shark',
    'sweep',
    'tauntaun',
    'unicorn',
    'usb',
    'water-can',
    'wine-glass',
    'wireframe'
];

var leftImage = document.getElementById('leftImage');
var centerImage = document.getElementById('centerImage');
var rightImage = document.getElementById('rightImage');
var imageContainer = document.getElementById('imageContainer');

leftImage.src = `img/${product[0]}.jpg`;
leftImage.alt = product[0];
leftImage.title = product[0];

centerImage.src = `img/${product[1]}.jpg`;
centerImage.alt = product[1];
centerImage.title = product[1];

rightImage.src = `img/${product[2]}.jpg`;
rightImage.alt = product[2];
rightImage.title = product[2];

function Products(name) {
    this.name = name;
    this.imagePath = `img/${this.name}.jpg`;
    this.click = 0;
    this.view = 0;
    Products.all.push(this);
}
Products.all = [];

for (var i = 0; i < product.length; i++) {
    new Products(product[i]);
}
var leftProduct, centerProduct, rightProduct;
function render() {
    leftProduct = Products.all[randomNumber(0, Products.all.length - 1)];
    console.log(leftProduct);
    centerProduct = Products.all[randomNumber(0, Products.all.length - 1)];
    console.log(centerProduct);
    rightProduct = Products.all[randomNumber(0, Products.all.length - 1)];
    console.log(rightProduct);
    while (leftProduct.imagePath === rightProduct.imagePath || leftProduct.imagePath === centerProduct.imagePath || rightProduct.imagePath === centerProduct.imagePath){
      leftProduct = Products.all[randomNumber(0, Products.all.length - 1)];
      centerProduct = Products.all[randomNumber(0, Products.all.length - 1)];
      rightProduct = Products.all[randomNumber(0, Products.all.length - 1)];
    }
    leftImage.src =leftProduct.imagePath;
    leftImage.alt = leftProduct.name;
    leftImage.title = leftProduct.name;

    centerImage.src =centerProduct.imagePath;
    centerImage.alt = centerProduct.name;
    centerImage.title = centerProduct.name;

    rightImage.src =rightProduct.imagePath;
    rightImage.alt = rightProduct.name;
    rightImage.title = rightProduct.name;

  
}

render();
var x = 25;
imageContainer.addEventListener('click',handleClickOnGoat);
var totalClicks =0;
function handleClickOnGoat(event) {
  if(totalClicks <x) {
    if(event.target.id !== 'imageContainer') {
      if(event.target.id === 'leftImage') {
        leftProduct.click++;
      } else if(event.target.id === 'centerImage') {
        centerProduct.click++;
      } else if(event.target.id === 'rightImage') {
        rightProduct.click++;
      }
      totalClicks++;
      leftProduct.view++;
      centerProduct.view++;
      rightProduct.view++;
      render();
    }
  }  else {
    console.log('more than 25 clicks');
    imageContainer.removeEventListener('click',handleClickOnGoat);
    render2();
  }
}
function render2() {
    var ulE1 = document.getElementById('summary');
    for (var i =0; i<Products.all.length ; i++) {
      var liE1 = document.createElement('li');
    //   Banana Slicer had 3 votes and was shown 5 times
      liE1.textContent = `${Products.all[i].name} had ${Products.all[i].click} votes and  was shown ${Products.all[i].view} times`;
      ulE1.appendChild(liE1);
      var liE1 = document.createElement('li');
    }
  }


  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }




