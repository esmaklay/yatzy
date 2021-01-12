/* TODO:
1. Local Storage
*/

class Game {
  constructor() {
    this.playersArray = [];
    this.noOfPlayers = 0;
    this.dice = new Dice();
    this.nrOfThrows = 3;
  };

  newGame() {
    document.querySelector(".throws").innerHTML = "You have <span>3</span> throws left";
    
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
    };

    for (let i = 0; i < this.noOfPlayers; i++) {
      let player = new Player(`player${i + 1}`);
      this.playersArray.push(player);
    };

    this.playersArray[0].turn = true;

    let playerfields = document.querySelectorAll(".player1");
    for (let i = 0; i < playerfields.length; i++) {
      playerfields[i].classList.add("active");
      playerfields[i].disabled = false;
    };
  };

  togglePlayers() {
    document.querySelector(".throws").innerHTML = "You have <span>3</span> throws left";

    this.nrOfThrows = 3;

    buttonThrow.disabled = false;

    let checkArray = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    );
    for (let box of checkArray) {
      box.checked = false;
      box.disabled = true;
    };

    for (let i = 0; i < this.playersArray.length; i++) {
      if (this.playersArray[i].turn === true) {
        let playerfields = document.querySelectorAll(`.player${[i + 1]}`);

        for (let i = 0; i < playerfields.length; i++) {
          playerfields[i].classList.remove("active");
          playerfields[i].disabled = true;
        };

        this.playersArray[i].turn = false;

        if (i + 1 === this.playersArray.length) {
          this.playersArray[0].turn = true;
          playerfields = document.querySelectorAll(".player1");
          for (let i = 0; i < playerfields.length; i++) {
            playerfields[i].classList.add("active");
            playerfields[i].disabled = false;
          };
        } else {
          this.playersArray[i + 1].turn = true;
          playerfields = document.querySelectorAll(`.player${[i + 2]}`);
          for (let i = 0; i < playerfields.length; i++) {
            playerfields[i].classList.add("active");
            playerfields[i].disabled = false;
          };
        };
        break;
      };
    };
  };

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
      };
    };
  };

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
      };
      psum.innerHTML = tempArray;
    };
  };

  throwDice() {
    let throwInfo = document.querySelector(".throws");
    let checkArray = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    );

    for (let box of checkArray) {
      box.disabled = false;
    };

    if (this.nrOfThrows >= 1) {
      console.log(this.nrOfThrows); 
      throwInfo.innerHTML = `You have <span>${
        this.nrOfThrows - 1
      }</span> throws left`;

      this.dice.throw();
      this.nrOfThrows = this.nrOfThrows - 1;
      };

      if (this.nrOfThrows == 0) {
        buttonThrow.disabled = true;
      };
    };

  saveData() {
    let p1Array = Array.from(document.querySelectorAll(`.player1`));
    p1Array = p1Array.map((element) => Number(element.value));
    
    let p2Array = Array.from(document.querySelectorAll(`.player2`));
    p2Array = p2Array.map((element) => Number(element.value));

    let p3Array = Array.from(document.querySelectorAll(`.player3`));
    p3Array = p3Array.map((element) => Number(element.value));

    let p4Array = Array.from(document.querySelectorAll(`.player4`));
    p4Array = p4Array.map((element) => Number(element.value));

    let p1fields = JSON.stringify(p1Array);
    let p2fields = JSON.stringify(p2Array);
    let p3fields = JSON.stringify(p3Array);
    let p4fields = JSON.stringify(p4Array);
      
    localStorage.setItem("p1Key", p1fields);
    localStorage.setItem("p2Key", p2fields);
    localStorage.setItem("p3Key", p3fields);
    localStorage.setItem("p4Key", p4fields);
  };

  getData() {
    let p1String = localStorage.getItem("p1Key")
    let p1data = JSON.parse(p1String);

    localStorage.setItem("player1", p1data)
  }
};


class Player {
  constructor() {
    this.turn = false;
  };
};

class Die {
  constructor() {
    this.value = 0;
  };

  throw() {
    this.value = Math.floor(Math.random() * 6 + 1);
  };
};

class Dice {
  constructor(no_dice = 5) {
    this.diceArray = [];
    for (let i = 0; i < no_dice; i++) {
      this.diceArray.push(new Die());
    };
  };

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
      for (let i = 0; i < (this.diceArray.length); i++) {
        if (id === (i+1)) {
          this.diceArray[i].throw();
        };
      };
    };

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
      };
    }; 

  };
};

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
    game1.saveData();
    game1.getData();
  });

  buttonThrow.addEventListener("click", function (e) {
    game1.throwDice();
  });
});
