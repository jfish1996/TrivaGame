//psuedo code 

$(document).ready(function(){


//create an array of questions and anwsers to pull from throughout the game load
var quizArray = [
{q:"What color is the sky?",
anwsers:["red","green","yellow","blue"],  
correcta:"blue"},

{q:"What is my middle name?",
anwsers:["james","den","ben","thomas"],  
correcta:"thomas"},

{q:"What planet are we on?",
anwsers:["mars","venus","mercury","earth"],  
correcta:"earth"},
{q:"How many Toy Stories are there?",
anwsers:["1","2","6","4"],  
correcta:"4"},
];
//create variables to pull from throughout the game

//create a varaible to use as our counter for iterating through questions maunally
var currentQ = 0;

//create a starting countdown time varaible
var countDown = 20;
//initalizing timer within the global scope to use later
var timer;
//creating a losses var
var losses=0;
//creating a wins var
var wins=0;

//inital function that runs on page load/since within the function we are going off of the var currentQ we can call this function
//to change our page depending on the value of currentQ 
function changePage() {
  //making sure countdown always starts on 20 when this function is called
  countDown = 20;

  //now we want the countdown to actually update, so we set an interval and pass it our counter function 
  //(john, this is a function instead of just passing countDown-- because we want to update the DOM display as well)
  timer = setInterval(counter, 1000);

  //define a var called question that pulls from quiz array but passing it our current questions variable initated above and then dot notation
  var question = quizArray[currentQ].q;
//create a variable that will then use almost the exact same method to locate our anwsers array
  var choices = quizArray[currentQ].anwsers;
  //grab the timer element from our html using JQUERY and then set its html element to an <h2> with our count down variable being the 
  //star of the show
$("#timer").html("<h2>"+"Time Remaining: "+countDown+"</h2>")
//then grab our game element from our HTML using JQ and do the following
  $("#game").html("<h2>"
  //set the question to be an H2 and display it on the page
  + question +"<h2/>"
  //run our function loadChoices that will then populate the page with choices...explination on function down below
  + loadChoices(choices) 
  )
  
  };

  //this function populates the page with our various anwser choices within our quizArray
 function loadChoices(choices){
   //first set our result to an empty string that we will then popualate with various <P> tags 
   var result = ''
//iterate through the argument that were passing through our function, in this chase choices
   for(i=0; i < choices.length; i++){
 //for each iteration through..

 //results now equals results + a new <p> with the class of "choice" a data value with the index of our current anwsers array and then a text value with the index of our current anwsers array 
     result += `<p class="choice" data-anwser="${choices[i]}">${choices[i]}</p>`
   }
//now return result so its variable will change within the global scope. 
   return result;
 };

//this function is doing multiple things, first it checks to see if were on the last question, and if we are displays results
//if were not on the last question, it will upadte our currentQ var +1 and then load change page
function nextQuestion(){

  //this var is set to check if we are on the last question by seeing the length of our quiz array -1 off of that
  //and then comparing it to our currentQ var value.
 var isQuestionOver = (quizArray.length - 1 ) === currentQ;

 //if we are on the last question, display results
  if(isQuestionOver){
    console.log("Youre done!!!")
    results();
//if not go to the next question and call the change page function 
  } else {
    currentQ++;
    changePage();
  }

}

//this function is what we will call within our change page function, it will update the DOM and tell the page what to do 
//if the timer hits 0
function counter(){
  //countDown variable goes down 
  countDown--;
  
  //the timer html displayed  on the DOM changes accoridgly;
  $("#timer").html("<h2> Time Remaining: " + countDown + "</h2>")
  
  //if the countDown var hits 0 
  if (countDown===0) {
    //run times up 
    timesUp();
  }
}

//this function determines what to do in the scenario of the clock hitting 0
function timesUp(){
  //clear the timer so we dont have odd time values stacking
  clearInterval(timer);
  //losses int goes up one
  losses++
  //run our next question function 
  nextQuestion()
  //console log for myself
  console.log(losses);
}


//this function is used to display results
function results(){
  //create various <p> tags and a button to populate the page that display all of our internal values
  //makes a resey button
  var result = `
  <p>You got ${wins} questions right </p>
  <p>You missed ${losses} questions </p>
  <p>You got ${wins} questions right </p>
  <button class= "btn btn-success" id="reset">Reset Game </button>
  `
  
  
//updates our DOM display so this is all we see
  $("#game").html(result)
}

//run changePage to get thegame going 
 changePage();
 
 //on click of our created .choice class
 $(document).on("click", ".choice" , function(){
 clearInterval(timer);
  //remember this

  //create a variable for our selected anwser (makes it easier on yourself later)
   var selectedAnwser = $(this).attr("data-anwser");
  console.log("you clicked " + selectedAnwser)

//if our clicked anwser is equal to the correcta we make in our quiz array
  if(selectedAnwser ===quizArray[currentQ].correcta) {
    console.log("you did it")
    //wins up one
    wins++;
    //next question function is called
    nextQuestion();
//if not
  } else{
    console.log("aw man")
    //losses int up
    losses++;
    //next question function is called
    nextQuestion()

  }


 })
//on click of our id rest button
 $(document).on("click", "#reset" , function(){
   //rest all variables
   console.log("working")
  currentQ = 0;

//create a starting time varaible
 countDown = 20;

 timer= null;

losses=0;

 wins=0;
 //call change page
changePage();

 });

});
