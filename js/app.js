'use strict'
// create array for images which shown in screen for each attempts
var onscreenImage = [];
// create array for clicks
var clicks = [];
// create array for views
var views = [];
// create array of the product:
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
// create arrvar for each image by the id .
var leftImage = document.getElementById('leftImage');
var centerImage = document.getElementById('centerImage');
var rightImage = document.getElementById('rightImage');
var imageContainer = document.getElementById('imageContainer');
// asign the value of the src , alt , name of left image
leftImage.src = `img/${product[0]}.jpg`;
leftImage.alt = product[0];
leftImage.title = product[0];
// asign the value of the src , alt , name of center image
centerImage.src = `img/${product[1]}.jpg`;
centerImage.alt = product[1];
centerImage.title = product[1];
// asign the value of the src , alt , name of right image
rightImage.src = `img/${product[2]}.jpg`;
rightImage.alt = product[2];
rightImage.title = product[2];


// make a constructor for the products and push it in to array
function Products(name) {
  this.name = name;
  this.imagePath = `img/${this.name}.jpg`;
  this.click = 0;
  this.view = 0;
  Products.all.push(this);
}
// make array that push in it the object
Products.all = [];
for (var i = 0; i < product.length; i++) {
  new Products(product[i]);
}
// save it in localStorage for that we do JSON.stringify
function updateProduct(){
  var productString = JSON.stringify(Products.all);
  localStorage.setItem('productChoose', productString);
}
// do the get and do the JSON.parse
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
// do the render 
function render() {
  // assign the value of the product to give the random image
  leftProduct = Products.all[randomNumber(0, Products.all.length - 1)];
  centerProduct = Products.all[randomNumber(0, Products.all.length - 1)];
  rightProduct = Products.all[randomNumber(0, Products.all.length - 1)];
  //  do the while to don't have the same product in the same attemp and do not have the same product in the 2 attemp in each time after each other
  while (leftProduct.imagePath === rightProduct.imagePath || leftProduct.imagePath === centerProduct.imagePath || rightProduct.imagePath === centerProduct.imagePath || onscreenImage.includes(leftProduct.imagePath) || onscreenImage.includes(centerProduct.imagePath) || onscreenImage.includes(rightProduct.imagePath)) {
    leftProduct = Products.all[randomNumber(0, Products.all.length - 1)];
    centerProduct = Products.all[randomNumber(0, Products.all.length - 1)];
    rightProduct = Products.all[randomNumber(0, Products.all.length - 1)];
  }
  // assign the value of the left , right center images  
  leftImage.src = leftProduct.imagePath;
  leftImage.alt = leftProduct.name;
  leftImage.title = leftProduct.name;

  centerImage.src = centerProduct.imagePath;
  centerImage.alt = centerProduct.name;
  centerImage.title = centerProduct.name;

  rightImage.src = rightProduct.imagePath;
  rightImage.alt = rightProduct.name;
  rightImage.title = rightProduct.name;

// give the value to the index of array in the onScreenImages. in each time the attemp show product in save in the array
  onscreenImage[0] = leftProduct.imagePath;
  onscreenImage[1] = centerProduct.imagePath;
  onscreenImage[2] = rightProduct.imagePath;

}
//  call the render
render();
// make avaribale for number of attempt
var x = 25;
//  make the eventListener
imageContainer.addEventListener('click', handleClickOnProduct);
// create variable for totalCliks
var totalClicks = 0;
function handleClickOnProduct(event) {
  // make if to do the 25 attempt
  if (totalClicks < x) {
    //  make if the user click in the section which contain the product
    if (event.target.id !== 'imageContainer') {
      //  make if the user click in the left image and if he click it increase the click one
      if (event.target.id === 'leftImage') {
        leftProduct.click++;
        //  make if the user click in the center image and if he click it increase the click one
      } else if (event.target.id === 'centerImage') {
        centerProduct.click++;
        //  make if the user click in the right image and if he click it increase the click one
      } else if (event.target.id === 'rightImage') {
        rightProduct.click++;
      }
      // increase the total click and the view for each products
      totalClicks++;
      leftProduct.view++;
      centerProduct.view++;
      rightProduct.view++;
      // call the render
      render();

    }
    // remove the EventListener
  } else {
    imageContainer.removeEventListener('click', handleClickOnProduct);
    updateProduct();
    render2();
  }
}
// create the ul consist the name of product and show the number of click and views
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
    // make the chart
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





