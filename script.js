class Game {
  constructor() {
    this.playersArray = [];
    this.noOfPlayers = 0;
    this.dice = new Dice();
    this.nrOfThrows = 3;
    this.inputValues;
  }

  newGame() {
    document.querySelector(".throws").innerHTML =
      "You have <span>3</span> throws left";

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
    document.querySelector(".throws").innerHTML =
      "You have <span>3</span> throws left";

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
    let throwInfo = document.querySelector(".throws");
    let checkArray = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    );

    for (let box of checkArray) {
      box.disabled = false;
    }

    if (this.nrOfThrows >= 1) {
      console.log(this.nrOfThrows);
      throwInfo.innerHTML = `You have <span>${
        this.nrOfThrows - 1
      }</span> throws left`;

      this.dice.throw();
      this.nrOfThrows = this.nrOfThrows - 1;
    }

    if (this.nrOfThrows == 0) {
      buttonThrow.disabled = true;
    }
  }

  saveData() {
    for (let i = 1; i <= this.noOfPlayers; i++) {
      this.inputValues = JSON.stringify(
        Array.from(document.querySelectorAll(`.player${i}`)).map((element) =>
          Number(element.value)
        )
      );
      localStorage.setItem(`p${i}Key`, this.inputValues);
    }
  }

  getData() {
    for (let i = 1; i <= this.noOfPlayers; i++) {
      let storage = JSON.parse(localStorage.getItem(`p${i}Key`));
      let inputs = document.querySelectorAll(`.player${i}`);

      for (let i = 0; i < inputs.length; i++) {
        if (storage[i] == 0) {
          inputs[i].value = "";
        } else {
          inputs[i].value = storage[i];
        }
      }
    }
  }

  resetGame() {
    localStorage.clear();
    let clearInput = Array.from(document.getElementsByTagName("input"));
    clearInput.map((element) => {
      element.value = "";
    });
  }
}

class Player {
  constructor() {
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
  constructor(no_dice = 5) {
    this.diceArray = [];
    for (let i = 0; i < no_dice; i++) {
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
        if (id === i + 1) {
          this.diceArray[i].throw();
        }
      }
    }

    //Change image to gif if not checked in checkbox
    for (let i = 0; i < 5; i++) {
      if (checkArray[i].checked === false) {
        document.querySelector(
          `.img${i + 1}`
        ).src = `giphy${this.diceArray[i].value}.gif`;
      } else {
        document.querySelector(
          `.img${i + 1}`
        ).src = `dice${this.diceArray[i].value}.png`;
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
  let storageBtnDiv = document.querySelector(".storage-buttons");
  let startBtn = document.getElementById("startBtn");
  let diceGrid = document.querySelector(".dicegrid");
  let logoDiv = document.querySelector(".logo");

  startBtn.addEventListener("click", function (e) {
    game1.newGame();
    startBtn.classList.add("hidden");
    sumBtnDiv.classList.remove("hidden");
    gameBtnDiv.classList.remove("hidden");
    storageBtnDiv.classList.remove("hidden");
    diceGrid.classList.remove("hidden");
    logoDiv.classList.add("hidden");
  });

  sumButton.addEventListener("click", function (e) {
    game1.sumSingulars();
  });

  totalButton.addEventListener("click", function (e) {
    game1.sumTotal();
  });

  btnDone.addEventListener("click", function (e) {
    game1.togglePlayers();
    game1.saveData();
  });

  buttonThrow.addEventListener("click", function (e) {
    console.log(game1.dice);
    game1.throwDice();
  });

  getData.addEventListener("click", function (e) {
    game1.getData();
  });

  resetGame.addEventListener("click", function (e) {
    game1.resetGame();
  });
});
