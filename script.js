//making descriptive variables!! longer = better key for someone else to understand without your help
const clueHoldTime = 500; //how long to hold each clue's light/sound
const cluePauseTime = 333;
const nextClueWaitTime = 500;

//Global Variables
var pattern = [];
var patternLength = 9;
var numBtns = 9;
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;
var guessCounter = 0;

function startGame() {
  for ( let i = 0; i < patternLength; i ++) pattern[i] = Math.ceil(Math.random() * numBtns);
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  if( gamePlaying   )
// swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
  //randomPattern();
  //randomPattern();
 
}

function stopGame() {
  gamePlaying: false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

// Sound Synthesis Functions
const freqMap = {
  1: 1318.51,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 572.4,
  6: 248.3,
  7: 345.6,
  8: 741.5,
  9: 279.5,
  
};
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}


// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log(
      "play single clue: " + pattern[i] + " in " + delay + "ms"
    );
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
}

function loseGame() {
  stopGame();
  alert("Game Over. You lost.");
}

function winGame() {
  stopGame();
  alert("Game Over,You Won!");
}
// const buttons = document.querySelectorAll('.game-buttons');
// console.log(buttons);

// buttons.forEach((btn) => {
//   console.log('<BTN>',btn);
//   btn.addEvenetListener('click', function(e) {
//     const currentButton = e.currentTarget;
//     const buttonValue = currentButton.getAttribute("data-value");
//     guess(buttonValue);
//   })
// });

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }
   if ( btn == pattern[guessCounter]) {
     if ( guessCounter == progress) {
       progress++;
       if ( progress == patternLength) {
         winGame();
         return;
       }
       playClueSequence();
      
     }
     else {
      guessCounter++;
    }
   } else {
      loseGame();
       return;
    }
   }
   


 function playMyAudio(){
       document.getElementById("myAudio").play();
      document.getElementById("audioStatus").innerHTML="Audio is Playing: 🎶 Empire State of Mind - Jay-Z ft.Alecia Keys";	 
      
     }
     function pauseMyAudio(){
       document.getElementById("myAudio").pause();
      document.getElementById("audioStatus").innerHTML="Audio Paused ⏸️";	
     }


