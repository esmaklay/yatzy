/* TODO:
1. Möjlighet att spara tärningar 
2. Hantera max 3 kast
3. Ta bort checkboxar när man trycker på "done"
4. Local Storage
5. Disabla spelare vars tur det inte är
5,5: Startknapp?
6. CSS... */

class Game {
  constructor() {
    this.playersArray = [];
    this.noOfPlayers = 0;
    this.dice = new Dice();
    this.nrOfThrows = 3;
  }

  newGame() {
    this.noOfPlayers = prompt("How many players are you? Choose between 2-4.");
    this.noOfPlayers = Number(this.noOfPlayers);

    while (this.noOfPlayers < 2 || this.noOfPlayers > 4) {
      this.noOfPlayers = prompt(
        "Choose between 2-4 players. How many players are you?"
      );
      this.noOfPlayers = Number(this.noOfPlayers);
    }

    for (let i = 0; i < this.noOfPlayers; i++) {
      let player = new Player(`player${i + 1}`);
      this.playersArray.push(player);
    }

    this.playersArray[0].turn = true;

    let playerfields = document.querySelectorAll(".player1");
    for (let i = 0; i < playerfields.length; i++) {
      playerfields[i].classList.add("active");
      playerfields[i].disabled = false;

      //DETTA DISABLAR SPELARE 1, DVS DET SKA VI INTE HA. MEN KODEN FUNKAR FÖR ATT DISABLA.
      // playerfields[i].disabled = true;
    }
    // let disabled = document.querySelectorAll(".player2, .player3, .player4");
    // console.log(disabled[i]);
    // disabled[i].disabled = true;

    /* ------- DISABLED SOM INTE RIKTIGT FUNKAR-------------*/
    // if (document.querySelectorAll(".active")) {
    //   for (let i = 0; i < playerfields.length; i++) {
    //     let disabled = document.querySelectorAll(".player2, .player3, .player4");
    //     disabled[i].disabled = true;
    //   }
    // }
  }

  togglePlayers() {
    this.nrOfThrows = 3;
    buttonThrow.disabled = false;
    for (let i = 0; i < this.playersArray.length; i++) {
      if (this.playersArray[i].turn === true) {
        let playerfields = document.querySelectorAll(`.player${[i + 1]}`);

        for (let i = 0; i < playerfields.length; i++) {
          playerfields[i].classList.remove("active");
          playerfields[i].disabled = true;
        }

        this.playersArray[i].turn = false;

        if (i + 1 === this.playersArray.length) {
          this.playersArray[0].turn = true;
          playerfields = document.querySelectorAll(".player1");
          for (let i = 0; i < playerfields.length; i++) {
            playerfields[i].classList.add("active");
            playerfields[i].disabled = false;
          }
        } else {
          this.playersArray[i + 1].turn = true;
          playerfields = document.querySelectorAll(`.player${[i + 2]}`);
          for (let i = 0; i < playerfields.length; i++) {
            playerfields[i].classList.add("active");
            playerfields[i].disabled = false;
          }
        }
        break;
      }
    }
  }

  sumSingulars() {
    for (let i = 1; i < this.noOfPlayers + 1; i++) {
      let tempArray = Array.from(document.querySelectorAll(`.player${i}`));
      let psum = document.getElementById(`p${i}sum`);

      tempArray = tempArray
        .slice(0, 6)
        .map((element) => Number(element.value))
        .reduce((acc, value) => acc + value, 0);
      psum.innerHTML = tempArray;

      if (tempArray >= 63) {
        document.getElementById(`bonus${i}`).innerHTML = "50";
      }
    }
  }

  sumTotal() {
    for (let i = 1; i < this.noOfPlayers + 1; i++) {
      let tempArray = Array.from(document.querySelectorAll(`.player${i}`));
      let psum = document.getElementById(`p${i}total`);

      tempArray = tempArray
        .map((element) => Number(element.value))
        .reduce((acc, value) => acc + value, 0);

      if (Number(document.getElementById(`bonus${i}`).innerHTML) > 0) {
        tempArray += 50;
      }
      psum.innerHTML = tempArray;
    }
  }

  throwDice() {
    //Loop through checkboxes. Return filtered array. If not checked, throw repsonding die.

    if (this.nrOfThrows >= 1) {
      console.log(this.nrOfThrows);
      this.dice.throw();
      this.nrOfThrows = this.nrOfThrows - 1;

      for (let i = 0; i < 5; i++) {
        document.querySelector(
          `.img${i + 1}`
        ).src = `giphy${this.dice.diceArray[i].value}.gif`;
      }

      if (this.nrOfThrows == 0) {
        buttonThrow.disabled = true;
      }
    }

    /*this.dice.throw();

    for (let i = 0; i < 5; i++) {
      document.querySelector(`.img${i+1}`).src=`dice${this.dice.diceArray[i].value}.png`
    };*/

    /*diceButton.addEventListener("click", function (event) {
    filteredArray = diceArray.filter((element) => {
      return element.checked;
    });

    console.log(filteredArray);
  });
*/
  }
}

class Player {
  constructor() {
    //this.name = name;
    this.turn = false;
  }
}

class Die {
  constructor() {
    this.value = 0;
    this.throw();
  }

  throw() {
    this.value = Math.floor(Math.random() * 6 + 1);
  }
}

class Dice {
  constructor(no_dices = 5) {
    this.diceArray = [];
    for (let i = 0; i < no_dices; i++) {
      this.diceArray.push(new Die());
    }
  }

  throw() {
    for (let current_die of this.diceArray) {
      current_die.throw();
    }
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  let game1 = new Game();
  game1.newGame();
  console.log(game1.playersArray);

  let sumButton = document.getElementById("sumButton");
  let totalButton = document.getElementById("totalButton");
  let btnDone = document.getElementById("btnDone");

  //DESSA ANVÄNDS INTE ÄN....
  /*  let player1 = document.getElementById("player1").value;
  let player2 = document.getElementById("player2").value;
  let player3 = document.getElementById("player3").value;
  let player4 = document.getElementById("player4").value; */

  sumButton.addEventListener("click", function (e) {
    game1.sumSingulars();
  });

  totalButton.addEventListener("click", function (e) {
    game1.sumTotal();
  });

  //let diceArray = Array.from(document.getElementsByClassName("dice"));

  btnDone.addEventListener("click", function (event) {
    game1.togglePlayers();
  });

  buttonThrow.addEventListener("click", function (event) {
    game1.throwDice();
  });
});
