console.log('it works');





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
    }
  }


  function countDown() {
      console.log('start');
      this.timerDown = setInterval(this.updateTime.bind(this), 1000);
    };

$( "document" ).click( countDown);



//the screen generates 8 bars with random colors from an array

let colors = ['#AEBCD1','#A7BCD1','red','#A7BAD1','#A7B4D1','#A7B4BC','#9DA9B1','#9DA9B6'];

function randomColorShuffle(array) {
  var randomArray = array.length, newArray, randomIndex;

  // When the array has more than 0 items
  while (0 !== randomArray) {

    // randomize the indexes
    randomIndex = Math.floor(Math.random() * randomArray);
    randomArray -= 1;

    //  move them around
    newArray = array[randomArray];
    array[randomArray] = array[randomIndex]; //this makes sure there are no duplicates and thats its the samme
    array[randomIndex] = newArray;
    // assignDiv();
    console.log('randomIndex')
  }
  return array;
}

randomColorShuffle(colors);
console.log(colors);


// function assignDiv() {
//     $('.bar').each(function(div) {
//         $('.bar').css('background-color',randomIndex);//WHYYYYYYYYY NOTTTTTTTTTTT
//     })
// }


//assign random color to the primary color.

//win state
//evaluate if user clicked on the correct button.
//if $('.bar').style.backgroundColor == $('.primarycolor').style.backgroundColor add 100 points
//change to round 2.
//else subtract -10 points
// function seeIfWinner (){


// $('.bar').click(function() {
  // let barColor = $('.bar');
  // let primaryColor = $('#primary-color');

//   while(barColor.css("background-color") != primaryColor.css("background-color") ){
//     alert('no')
//   } else{
//     alert('yes');
//   }
// });


// $( '.bar').click(function() {
//   let barColor = $('.bar');
//   let primaryColor = $('#primary-color');

//   $( '.bar' ).each(function( i ) {
//     if ( barColor.css("background-color") === primaryColor.css("background-color") ){
//       alert('yes');
//     } else {
//       alert('no');
//     }
//   });

// });



//this function evaluates if what button is the correct color
$('.color-container').on('click', '.bar', evaluate);

function evaluate() {
  let primaryColor = $('#primary-color');

    if ( $(this).css("background-color") === primaryColor.css("background-color") ){
      alert('yes');

      addPoints();
      addRound();
      resetTimer();
    } else {
      $(this).css('border-bottom', 'solid 2px red');
      $(this).css('border-top', 'solid 2px red');
      $(this).mouseout(function(){
          $(this).css('border', 'solid 2px white');
      });
      subtractPoints();

    }
}



function resetTimer () {
      console.log('reset timer');
      timer.seconds = 31;
      countDown();
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
  roundNumber+=1;
  round.text(roundNumber);
}

//score function
//if button clicked is correct, add 100 points








//rounds
