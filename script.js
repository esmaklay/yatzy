/* TODO:
4. Local Storage
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
    let checkArray = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    );
    for (let box of checkArray) {
      box.disabled = true;
    }

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
    }
  }

  togglePlayers() {
    this.nrOfThrows = 3;
    buttonThrow.disabled = false;

    let checkArray = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    );
    for (let box of checkArray) {
      box.checked = false;
      box.disabled = true;
    }

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
    this.sumSingulars();
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
    let checkArray = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
      
    );
    console.log(checkArray);
    for (let box of checkArray) {
      box.disabled = false;
    }
console.log(checkArray);
    if (this.nrOfThrows >= 1) {
      console.log(this.nrOfThrows);
      this.dice.throw();
      this.nrOfThrows = this.nrOfThrows - 1;
      console.log(this.dice.diceArray);

      for (let i = 0; i < 5; i++) {
        document.querySelector(
          `.img${i + 1}`
        ).src = `giphy${this.dice.diceArray[i].value}.gif`;
console.log(checkArray);
        if (checkArray[i].checked === true) {
          document.querySelector(
            `.img${i + 1}`
          ).src = `dice${this.dice.diceArray[i].value}.png`;
        }
        
      }

      

      if (this.nrOfThrows == 0) {
        buttonThrow.disabled = true;
      }
    }
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
    //Gather all checkboxes in an array.
    let checkArray = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    );

    //Return filtered array of unchecked checkboxes.
    let filteredArray = checkArray.filter((checkbox) => {
      return checkbox.checked === false;
    });

    //Throw all die responding to checkbox id by checking.
    for (let current_box of filteredArray) {
      let id = Number(current_box.id);
      for (let i = 0; i < this.diceArray.length; i++) {
        if (id === i) {
          this.diceArray[i - 1].throw();
        }
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  let game1 = new Game();
  let sumButton = document.getElementById("sumButton");
  let sumBtnDiv = document.querySelector(".sum-buttons");
  let totalButton = document.getElementById("totalButton");
  let btnDone = document.getElementById("btnDone");
  let buttonThrow = document.getElementById("buttonThrow");
  let gameBtnDiv = document.querySelector(".game-buttons");
  let startBtn = document.getElementById("startBtn");

  startBtn.addEventListener("click", function (e) {
    game1.newGame();
    startBtn.classList.add("hidden");
    sumBtnDiv.classList.remove("hidden");
    gameBtnDiv.classList.remove("hidden");
  });

  sumButton.addEventListener("click", function (e) {
    game1.sumSingulars();
  });

  totalButton.addEventListener("click", function (e) {
    game1.sumTotal();
  });

  btnDone.addEventListener("click", function (e) {
    game1.togglePlayers();
  });

  buttonThrow.addEventListener("click", function (e) {
    game1.throwDice();
  });
});
