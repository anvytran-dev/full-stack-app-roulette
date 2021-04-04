//This app was created with the help of Danstan, Zrybea, Zuri, Hillary, LeJon, Jerry, and Monica. 

// var button = document.querySelector('button').addEventListener('click', bet)

//Player's Bet
var bet =  0

//Put an event listener on all poker chips.
document.querySelectorAll('.pokerchips').forEach(num => num.addEventListener('click', addChips))

function addChips(e){
  var chip = Number(e.target.getAttribute('data-value'))
  console.log((e.target))
  if(chip == 100){
    bet += 100
  }else if (chip === 1000) {
    bet += 1000
  }else if (chip === 10000) {
    bet += 10000
  }else if (chip === 100000) {
    bet += 100000
  }else if (chip === 1000000) {
    bet += 1000000
  }
  // return bet
  console.log(bet);

  document.querySelector('.h2BetAmount').innerText = bet

}

//RESET GAME

document.getElementById('resetBet').addEventListener('click', resetGame)

function resetGame() {

    document.querySelector('.h2PlayerChoice').innerText = ""
    document.querySelector('.h2ComputerChoice').innerText = ""
    document.querySelector('.h2Results').innerText = ""
    document.querySelector('.h2BetAmount').innerText = 0
    document.querySelector('.h3PlayerTotal').innerText = 0
}

//Player clicks 'BET' button and the wheel spins and generates a result.

document.querySelector('#submitBet').addEventListener('click', spinWheel);

  function spinWheel() {

    winnerComparison(playerChoice)
    let amount = Number(betAmount.innerText)


//SEND THE RESULT TO THE DATABASE

    fetch('profile', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({

        'winner': winner,
        'betAmount': amount,
        'profit': 0

      })
    })


    .then(response => {
      if (response.ok) return response.json()
        // Add some stylying to notify the client that item has been selected
        // window.location.reload()
    })

    betAmount.innerText

    console.log(betAmount.innerText);

    }

//Event listeners are added on each square on the table and the player's choice is recorded (thanks to the 'getPlayerChoice' function)

var num = document.getElementsByClassName("num");

  Array.from(num).forEach(function(element) {

      element.addEventListener('click', getPlayerChoice)

  });

//Record the player's choice AKA the square they clicked on.

let playerChoice

  function getPlayerChoice(e){

    const betNumber = e.target.innerText
    const betColor = e.target.getAttribute('data-value')
    playerChoice = `${betNumber} ${betColor}`

    document.querySelector('.h2PlayerChoice').innerText = `You bet on ${playerChoice}`
    console.log(playerChoice)


}


  //This function generates a random computer choice

  function randomComputerChoice(){
    let randomColor = Math.floor(Math.random())
    let computerColor
    let computerNumber = Math.floor(Math.random() * 37)

      if(randomColor <= .5){
        computerColor = "red"
      }else{
        computerColor = "black"
      }

      let computerChoice = `${computerNumber} ${computerColor}`
      return computerChoice

  }

  let winner
  let loser

//This function checks who has won.

  function winnerComparison(playerChoice){
    computerChoice = randomComputerChoice()

    printComputerChoice(computerChoice)

    if(playerChoice === computerChoice){
      //let playerBank = bet * 10  -->pseudo code to add winnings to player's bank that they'll be able to "witdraw"
      //total = total - playerBank -->pseudo that subracts the winnings from the casino total
      console.log("player wins");//don't know what will happen when wins occur just yet
      let result = "You win!"
      winner = "player"
      loser = "casino"
      printResults(result)
      updatePlayerTotal(winner)

    }else{
      console.log("casino wins");//don't know what will happen when wins occur just yet
      let result = "You lost! Casino wins"
      winner = "casino"
      loser = "player"
      printResults(result)
      updatePlayerTotal(winner)
    }



  }


  function updatePlayerTotal(winner) {
    let playerTotal = Number(document.querySelector('.h3PlayerTotal').innerText)
    let betAmount = Number(document.querySelector('.h2BetAmount').innerText)

    if(winner === "player") {
      let updatedTotal = playerTotal + betAmount

      return document.querySelector('.h3PlayerTotal').innerText = updatedTotal

    } else if (winner === "casino") {
      let updatedTotal = playerTotal - betAmount

      return document.querySelector('.h3PlayerTotal').innerText = updatedTotal
    }
  }


  //Prints computer choice.

  function printComputerChoice(computerChoice) {
    document.querySelector('.h2ComputerChoice').innerText = `Roulette ball stopped on ${computerChoice}.`
  }

   //Prints the result of the spin.

  function printResults(result) {
    document.querySelector('.h2Results').innerText = result
  }



