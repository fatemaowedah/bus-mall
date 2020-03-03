'use strict'
var onscreenImage = [];
var clicks = [];
var views = [];
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
function updateProduct(){
  var productString = JSON.stringify(Products.all);
  localStorage.setItem('productChoose', productString);
}
function getProduct(){
  var productString = localStorage.getItem('productChoose');
  console.log(productString);
  if(productString){
    Products.all = JSON.parse(productString);
    render2();
  }
}
getProduct();
var leftProduct, centerProduct, rightProduct;
function render() {
  leftProduct = Products.all[randomNumber(0, Products.all.length - 1)];
  centerProduct = Products.all[randomNumber(0, Products.all.length - 1)];
  rightProduct = Products.all[randomNumber(0, Products.all.length - 1)];
  while (leftProduct.imagePath === rightProduct.imagePath || leftProduct.imagePath === centerProduct.imagePath || rightProduct.imagePath === centerProduct.imagePath || onscreenImage.includes(leftProduct.imagePath) || onscreenImage.includes(centerProduct.imagePath) || onscreenImage.includes(rightProduct.imagePath)) {
    leftProduct = Products.all[randomNumber(0, Products.all.length - 1)];
    centerProduct = Products.all[randomNumber(0, Products.all.length - 1)];
    rightProduct = Products.all[randomNumber(0, Products.all.length - 1)];
  }
  leftImage.src = leftProduct.imagePath;
  leftImage.alt = leftProduct.name;
  leftImage.title = leftProduct.name;

  centerImage.src = centerProduct.imagePath;
  centerImage.alt = centerProduct.name;
  centerImage.title = centerProduct.name;

  rightImage.src = rightProduct.imagePath;
  rightImage.alt = rightProduct.name;
  rightImage.title = rightProduct.name;


  onscreenImage[0] = leftProduct.imagePath;
  onscreenImage[1] = centerProduct.imagePath;
  onscreenImage[2] = rightProduct.imagePath;

}

render();
var x = 25;
imageContainer.addEventListener('click', handleClickOnProduct);
var totalClicks = 0;
function handleClickOnProduct(event) {
  if (totalClicks < x) {
    if (event.target.id !== 'imageContainer') {
      if (event.target.id === 'leftImage') {
        leftProduct.click++;
      } else if (event.target.id === 'centerImage') {
        centerProduct.click++;
      } else if (event.target.id === 'rightImage') {
        rightProduct.click++;
      }
      totalClicks++;
      leftProduct.view++;
      centerProduct.view++;
      rightProduct.view++;
      render();

    }
  } else {
    imageContainer.removeEventListener('click', handleClickOnProduct);
    updateProduct();
    render2();
  }
}

function render2() {
  var ulE1 = document.getElementById('summary');
  ulE1.innerHTML = "";
  for (var i = 0; i < product.length; i++) {
    var liE1 = document.createElement('li');
    //   Banana Slicer had 3 votes and was shown 5 times
    liE1.textContent = `${Products.all[i].name} had ${Products.all[i].click} votes and  was shown ${Products.all[i].view} times`;
    ulE1.appendChild(liE1);
    var liE1 = document.createElement('li'); 
    clicks.push(Products.all[i].click);
    views.push(Products.all[i].view);
    console.log(clicks);
    console.log(views);
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: product,
        datasets: [{
          label: '# of clicks',
          data: clicks,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: '# of veiw',
          data: views,
          backgroundColor: 'aquamarine',
          borderColor: '#009688',
          borderWidth: 1


        }]

      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

  }
}
console.log(clicks);

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}





