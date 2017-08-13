console.log('hello world');


//this is the Introduction page
let introDiv = $(`<div class="intro">`);
let startButton = $(`<div class="start-button">begin</div>`);

$( document ).ready(function() {


    $('nav').hide();
    $('.container').hide();

    $('body').css('background-color', '#333333')

    introDiv.append( `<h3>Welcome to Hue Select.<br>
      You will be presented 8 colors. You have a limited amount of time to match one of the 8 colors
      with the large color block. For every incorrect color selection your total score will subtract by 10 points. For every correct color
      selection, you will receive 100 points and move on to the next round. Difficulty will vary depending on round. Good luck. </h3>` );
    $( "body" ).append( introDiv );

    introDiv.animate({
        opacity: 1,
        top: 20
    }, 1000 );

    startButton.fadeIn( 1000);

    $("body").append( startButton );

    $(startButton).click(function(){
        introDiv.hide();
        startGame();
    });
});


function startGame(){
    $('body').css('background-color', '#fff')
    $(startButton).hide();
    $('.intro').hide();
    roundNumber = 1;
    $('.container').show();
    resetCountDown();
    countDown();
}

//this function changes round #s when user gets correct color
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

//this resets the game, berings user to the Introduction page.
$('#reset-button').click(function(){
    window.location.reload();
});

//this calls the functions when the user selects the correct color.
function advanceToNextRound() {
    addPoints();
    addRound();
    resetCountDown();
    countDown();
    changeColor();
}

//this automatically switches the user to the next round, if the timer reaches 0
function TimeOutNextRound() {
    addRound();
    resetCountDown();
    countDown();
    changeColor();
}


//this is the function that assigns the colors
let arrayColorOptions = [[]
['#B3E6FF','#ADE1FA','#ADDAF2','#A3DAF2','#A3DAFF','#95DAFF','#CBF0FF','#CBE7FF'],
['#45BE6E','#61BE6C','#5FBA6A','#75E582','#72E080','#57AB61','#29B23E','#29B23E'],
['#FF6638','#FF5C38','#FF4A38','#FF4A45','#FF5945','#FF5936','#FF5924','#DB4D1F'],
['#E64F43','#C7443A','#B03C33','#C44339','#C44339','#942B2B','#AB3227','#A6301F'],
['#FFE975','#F4E375','#EDE375','#EDDB75','#EDDB82','#EDDB8C','#EAD883','#EAD87A'],
['#795786','#79618C','#89618C','#92618C','#926198','#9E6198','#9E7198','#9E718E'],
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


//function that assigns each div a color in colorarray# and assigns they primary color randomly from that array.

function assignColor() {

    var bar = $('.bar');
    for (var i = 0; i < individualColorArray.length; i++) {
        $(bar[i]).css('background-color', individualColorArray[i]);
    };

    let randomColor = individualColorArray[Math.floor(Math.random() * individualColorArray.length)];
    $('#primary-color').css('background', randomColor);

    console.log('this is the primary color' + randomColor)
}

//this function is the time tracker
//the time counts down from 30
let timer = {
    seconds: 30,
    timeDown: 1,
    timerId: document.getElementById("timer-container"),
};

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
    this.timerDown = setInterval(this.updateTime.bind(this), 5);
};

function resetCountDown () {
    console.log('reset timer');
    clearTimeout(this.timerDown);
    timer.seconds = 31;
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



    colorArray=['#B3E6FF','#795786','#A22D3A','#E64F43','#FFE975','#45BE6E','#45BE6E'];
    let randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
function randomColorFinishState(){

    $('.finish-state').css('border-color', randomColor);
    $('h4').css('color', randomColor);
    $('.intro').css('color', randomColor);

    };
setInterval(function randomColorChangeEveryFewSeconds(){randomColorFinishState(0)},1000);

$('.finish-state').click(function(){
    window.location.reload();
});


