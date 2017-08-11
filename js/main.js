console.log('it works');


  let myDiv = $(`<div class="intro">`);
  let startButton = $(`<div class="start-button">Start</div>`);


$( document ).ready(function() {

    $('nav').hide();
    $('.container').hide();

    $('body').css('background-color', '#E2E8BA')

    myDiv.append( `<h3>Welcome to Match Colors. You have a limited amount of time to make the large color block with the color bars. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis consectetur leo vitae convallis. Nam sed nulla pharetra, elementum felis tempus, sollicitudin nulla. Aenean dictum risus velit, et vestibulum orci finibus quis. Curabitur ac leo vitae nulla feugiat dictum. Nullam dignissim erat libero, nec blandit diam facilisis in.</h3>` );
    $( "body" ).append( myDiv );

    // myDiv.hide();

    myDiv.fadeIn( 500);

    myDiv.animate({top: 50}, 1000 );


   myDiv.fadeIn('slow');





    startButton.fadeIn( 1000);

    $("body").append( startButton );

    $(startButton).click(function(){
      console.log('please please please work')
      startGame();

    });

});


function startGame(){

    $('body').css('background-color', '#fff')

    $('.intro').hide();

    $('.container').show();
    $(startButton).hide();



  //start timer
    resetCountDown();
    countDown();
}


$('#reset-button').click(function(){
        console.log('clicked baby!');
       $('.container').hide();
      myDiv.animate({top: 30}, "slow");
        $('body').css('background-color', '#E2E8BA')
});


function advanceToNextRound() {
  console.log('yoooo')
  addPoints();
  addRound();

  resetCountDown();
  countDown();
  changeColor();
  // assignColor();
}

function TimeOutNextRound() {
  addRound();

  resetCountDown();
  countDown();
  changeColor();
}


//this is the function that assigns the colors
let arrayColorOptions = [[],['#B3E6FF','#ADE1FA', '#ADDAF2', '#A3DAF2', '#A3DAFF', "#95DAFF", '#CBF0FF', '#CBE7FF'], ['#795786', '#79618C', '#89618C', '#92618C', '#926198', '#9E6198', '#9E7198', '#9E718E'], ['#A22D3A','#A22D35','#A22835','#9B2835','#9B282E','#9B222E','#94222E','#941C2E'], ['#E64F43','#E64F4A', '#E6544A', '#ED544A', '#F2544A', "#F24C4A", '#F24C43', '#F24C3A'], ['#FFE975','#F4E375', '#EDE375', '#EDDB75', '#EDDB82', "#EDDB8C", '#EAD883', '#EAD87A'],['#45BE6E','#40BE6E', '#35BA6E', '#35BA60', '#238135', "#29993E", '#29B23E', '#29B25E'],['#ABD7F7','#9DC5E3', '#9DD1E3', '#8AD1E3', '#9AE8FC', "#B6E8FC", '#C0DEFC', '#BCDAF7']]

function changeColor() {

  arrayColorOptions.shift();
  individualColorArray = arrayColorOptions[0]
  assignColor();

}
  //new function that assigns each div a color in colorarray#
  // and assign primary color randomly from that array.

function assignColor() {
  // individualColorArray=['#CCEDFF', '#BAEDFF', '#BAEDF0', '#BAE3F0', '#BAD9F0', '#B2D9F0', '#B2D9D9', '#C7D9D9'];

  var bar = $('.bar');
  for (var i = 0; i < individualColorArray.length; i++) {
      $(bar[i]).css('background-color', individualColorArray[i]);
  };


  //assign #primary-color to a random value in individualColorArray
  let randomColor = individualColorArray[Math.floor(Math.random() * individualColorArray.length)];
  $('#primary-color').css('background', randomColor);

  console.log('this is the primary color' + randomColor)
}



//this is my time tracker
//the time counts down from 30
//at 0 seconds the browser switches to the next round
let timer = {
  seconds: 30,
  timeDown: 1,
  timerId: document.getElementById("timer-container"),
  }

console.log(this.timerId);

function updateTime(){
    if (timer.seconds > 0){
      timer.seconds--;
      timer.timerId.textContent = timer.seconds;
    }else {
      TimeOutNextRound();
    }
  }


function countDown() {
  console.log('start');

  this.timerDown = setInterval(this.updateTime.bind(this), 200);
};


function resetCountDown () {
      console.log('reset timer');
      clearTimeout(this.timerDown);
      timer.seconds = 31;
}



//the screen generates 8 bars with random colors from an array

// let colors = ['#AEBCD1','#A7BCD1','red','#A7BAD1','#A7B4D1','#A7B4BC','#9DA9B1','#9DA9B6'];

// function randomColorShuffle(array) {
//   var randomArray = array.length, newArray, randomIndex;

//   // When the array has more than 0 items
//   while (0 !== randomArray) {

//     // randomize the indexes
//     randomIndex = Math.floor(Math.random() * randomArray);
//     randomArray -= 1;

//     //  move them around
//     newArray = array[randomArray];
//     array[randomArray] = array[randomIndex]; //this makes sure there are no duplicates and thats its the samme
//     array[randomIndex] = newArray;
//     // assignDiv();
//     console.log('randomIndex')
//   }
//   return array;
// }

// randomColorShuffle(colors);
// console.log(colors);



//this function evaluates if what button is the correct color
$('.color-container').on('click', '.bar', evaluate);

function evaluate() {
  let primaryColor = $('#primary-color');

    if ( $(this).css("background-color") === primaryColor.css("background-color") ){
      advanceToNextRound();
    }  {
      $(this).css('border-bottom', 'solid 2px red');
      $(this).css('border-top', 'solid 2px red');
      $(this).mouseout(function(){
          $(this).css('border', 'solid 2px white');
      });
      subtractPoints();
    }
}

function finishTimer () {
      console.log('end timer');
      clearInterval(this.timerDown);

}

//these functions counts the users score
let count=0
let score = $('#score')

function addPoints () {
  count+=100;
  score.text(count);
}

function subtractPoints(){
  count-=10;
  score.text(count);
};

//this function changes rounds when user gets correct color
let roundNumber=1;
let round = $('#round');

function addRound(){
  if (roundNumber < 7){
    roundNumber+=1;
    round.text(roundNumber);
  } if (roundNumber > 7) {
    finishTimer();
  }
}


function finishedState(){
  $('.row').hide();
  $('body').css('background-color', '#A7B4BC')
}


