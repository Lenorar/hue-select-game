console.log('it works');

let myDiv = $(`<div class="intro">`);
let startButton = $(`<div class="start-button">Start</div>`);

$( document ).ready(function() {

    $('nav').hide();
    $('.container').hide();

    $('body').css('background-color', '#E2E8BA')


    //if first load choose this
    myDiv.append( `<h3>Welcome to Match Colors. You have a limited amount of time to make the large color block with the color bars. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis consectetur leo vitae convallis. Nam sed nulla pharetra, elementum felis tempus, sollicitudin nulla. Aenean dictum risus velit, et vestibulum orci finibus quis. Curabitur ac leo vitae nulla feugiat dictum. Nullam dignissim erat libero, nec blandit diam facilisis in.</h3>` );
    $( "body" ).append( myDiv );

    //if previous click was reset-button show this



    myDiv.animate({
        opacity: 1,
        top: 50
    }, 2000 );


    startButton.fadeIn( 1000);

    $("body").append( startButton );

    $(startButton).click(function(){
        myDiv.hide();
        startGame();
    });

});


//this function changes rounds when user gets correct color
let roundNumber = 1;
let round = $('#round');
function addRound(){
    if (roundNumber < 7){
        roundNumber+=1;
        round.text(roundNumber);
    } if (roundNumber > 7) {
        finishTimer();
        finishedState();
    }
}
function startGame(){
    console.log('this is the beginning layout of game')
    $('body').css('background-color', '#fff')
    $(startButton).hide();
    $('.intro').hide();
    roundNumber = 1;
    $('.container').show();
    resetCountDown();
    countDown();
}



$('#reset-button').click(function(){
    window.location.reload();
});


function advanceToNextRound() {
    console.log('yoooo')
    addPoints();
    addRound();
    resetCountDown();
    countDown();
    changeColor();
}

function TimeOutNextRound() {
    addRound();
    resetCountDown();
    countDown();
    changeColor();
}


//this is the function that assigns the colors
let arrayColorOptions = [[]
['#B3E6FF','#ADE1FA','#ADDAF2','#A3DAF2','#A3DAFF','#95DAFF','#CBF0FF','#CBE7FF'],
['#795786','#79618C','#89618C','#92618C','#926198','#9E6198','#9E7198','#9E718E'],
['#A22D3A','#A22D35','#A22835','#9B2835','#9B282E','#9B222E','#94222E','#941C2E'],
['#E64F43','#E64F4A','#E6544A','#ED544A','#F2544A','#F24C4A','#F24C43','#F24C3A'],
['#FFE975','#F4E375','#EDE375','#EDDB75','#EDDB82','#EDDB8C','#EAD883','#EAD87A'],
['#45BE6E','#40BE6E','#35BA6E','#35BA60','#238135','#29993E','#29B23E','#29B25E'],
['#8FC5E3','#9DC5E3','#9DD1E3','#8AD1E3','#9AE8FC','#B6E8FC','#C0DEFC','#BCDAF7']]

function changeColor() {

    if (arrayColorOptions.length == 1){
      resetCountDown();
      finishedState();
      return

    }


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
};

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
    this.timerDown = setInterval(this.updateTime.bind(this), 100);
};


function resetCountDown () {
    console.log('reset timer');
    clearTimeout(this.timerDown);
    timer.seconds = 31;
}





function updateTimeThreeTwoOne(){
    if (timer.seconds > 0){
      timer.seconds--;
      timer.timerId.textContent = timer.seconds;
    }else {
      startGame();
    }
}

//this function counts down from 3
function resetCountDownEasy () {

    clearTimeout(this.timerDown);
    timer.seconds = 4;

    updateTimeThreeTwoOne();

    this.timerDown = setInterval(this.updateTimeThreeTwoOne.bind(this), 1000);

}



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





function finishedState(){
    $('body').css('background-color', '#fbfbfb')
    $('.color-container').hide();
    $('.reset').hide();
    $('#timer-container').hide();
    $('.rounds-container').hide();
    $('#primary-color').hide();


    $( ".score-container" ).addClass( "final-score" );

    $('.finish-state').animate({
        opacity: 100,
}, 2000 );

    randomColorFinishState();
    randomColorChangeEveryFewSeconds();
}

function randomColorFinishState(){


    colorArray=['#B3E6FF','#795786','#A22D3A','#E64F43','#FFE975','#45BE6E','#45BE6E'];
    let randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    $('.finish-state').css('border-color', randomColor);
    $('h4').css('color', randomColor);


    };
setInterval(function randomColorChangeEveryFewSeconds(){randomColorFinishState(0)},1000);

$('.finish-state').click(function(){
    window.location.reload();
});


