class Game {
  constructor() {
    this.playersArray = [];
  }

    newGame() {
        let noOfPlayers = prompt("How many players are you? Choose between 2-4.");
        noOfPlayers = Number(noOfPlayers);

        while (noOfPlayers < 2 || noOfPlayers > 4) {
            noOfPlayers = prompt("Choose between 2-4 players. How many players are you?");
            noOfPlayers = Number(noOfPlayers);
        };

        for (let i = 0; i < noOfPlayers; i++) {
            let player = new Player(`player${i+1}`);
            this.playersArray.push(player);
        };

    this.playersArray[0].turn = true;

    let playerfields = document.querySelectorAll(".player1");
    for (let i = 0; i < playerfields.length; i++) {
      playerfields[i].classList.add("active");

      //DETTA DISABLAR SPELARE 1, DVS DET SKA VI INTE HA. MEN KODEN FUNKAR FÖR ATT DISABLA.
      //playerfields[i].disabled = true;
    }

    /* ------- DISABLED SOM INTE RIKTIGT FUNKAR-------------*/
    // if (document.querySelectorAll(".active")) {
    //   for (let i = 0; i < playerfields.length; i++) {
    //     let disabled = document.querySelectorAll(".player2, .player3, player4");
    //     disabled[i].disabled = true;
    //   }
    // }
  }

  togglePlayers() {
    for (let i = 0; i < this.playersArray.length; i++) {
      if (this.playersArray[i].turn === true) {
        let playerfields = document.querySelectorAll(`.player${[i + 1]}`);

        for (let i = 0; i < playerfields.length; i++) {
          playerfields[i].classList.remove("active");
        }

        this.playersArray[i].turn = false;

        if (i + 1 === this.playersArray.length) {
          this.playersArray[0].turn = true;
          playerfields = document.querySelectorAll(".player1");
          for (let i = 0; i < playerfields.length; i++) {
            playerfields[i].classList.add("active");
          }
        } else {
          this.playersArray[i + 1].turn = true;
          playerfields = document.querySelectorAll(`.player${[i + 2]}`);
          for (let i = 0; i < playerfields.length; i++) {
            playerfields[i].classList.add("active");
          }
        }
        break;
      }
    }
  }

  sumSingulars() {
    let tempArray1 = Array.from(document.getElementsByClassName("player1"));
    let tempArray2 = Array.from(document.getElementsByClassName("player2"));
    let tempArray3 = Array.from(document.getElementsByClassName("player3"));
    let tempArray4 = Array.from(document.getElementsByClassName("player4"));

    let p1sum = document.getElementById("p1sum");
    tempArray1 = tempArray1.slice(0, 6);
    let player1_singulars = tempArray1.map((element) => Number(element.value));
    let p1summedsingulars = player1_singulars.reduce(
      (acc, value) => acc + value,
      0
    );
    p1sum.innerHTML = p1summedsingulars;
    if (p1summedsingulars >= 63) {
      document.getElementById("bonus1").innerHTML = "50";
    }

    let p2sum = document.getElementById("p2sum");
    tempArray2 = tempArray2.slice(0, 6);
    let player2_singulars = tempArray2.map((element) => Number(element.value));
    let p2summedsingulars = player2_singulars.reduce(
      (acc, value) => acc + value,
      0
    );
    p2sum.innerHTML = p2summedsingulars;
    if (p2summedsingulars >= 63) {
      document.getElementById("bonus2").innerHTML = "50";
    }

    let p3sum = document.getElementById("p3sum");
    tempArray3 = tempArray3.slice(0, 6);
    let player3_singulars = tempArray3.map((element) => Number(element.value));
    let p3summedsingulars = player3_singulars.reduce(
      (acc, value) => acc + value,
      0
    );
    p3sum.innerHTML = p3summedsingulars;
    if (p3summedsingulars >= 63) {
      document.getElementById("bonus3").innerHTML = "50";
    }

    let p4sum = document.getElementById("p4sum");
    tempArray4 = tempArray4.slice(0, 6);
    let player4_singulars = tempArray4.map((element) => Number(element.value));
    let p4summedsingulars = player4_singulars.reduce(
      (acc, value) => acc + value,
      0
    );
    p4sum.innerHTML = p4summedsingulars;
    if (p4summedsingulars >= 63) {
      document.getElementById("bonus4").innerHTML = "50";
    }
  }

  sumTotal() {
      //Här summeras totalen, funkar som ovan
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.turn = false;
  }
}

class Die {
    constructor() {
        this.value = 0;
        this.throw();
    }

    throw() {
        this.value = Math.floor(Math.random() *6 + 1);

              
               
    
    }
}

class Dice {
    constructor(no_dices=5) {
        this.dice = []
        for (let i=0; i < no_dices; i++) {
            this.dice.push(new Die())
        }
    }

    throw(){
       /*  for (let i=0; i < this.dice.length; i++) {
            this.dice[i].throw() */
        
            for (let current_die of this.dice) {
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

  let player1 = document.getElementById("player1").value;
  let player2 = document.getElementById("player2").value;
  let player3 = document.getElementById("player3").value;
  let player4 = document.getElementById("player4").value;

  //FLYTTAT TILL CLASS GAME() SOM METOD!
  /* let tempArray1 = Array.from(document.getElementsByClassName("player1"));
  let tempArray2 = Array.from(document.getElementsByClassName("player2"));
  let tempArray3 = Array.from(document.getElementsByClassName("player3"));
  let tempArray4 = Array.from(document.getElementsByClassName("player4")); */

  sumButton.addEventListener("click", function (e) {
      game1.sumSingulars();

      //NEDAN ÄR FLYTTAT TILL CLASS GAME() SOM METOD!
    /* let p1sum = document.getElementById("p1sum");
    tempArray1 = tempArray1.slice(0, 6);
    let player1_singulars = tempArray1.map((element) => Number(element.value));
    p1summedsingulars = player1_singulars.reduce(
      (acc, value) => acc + value,
      0
    );
    p1sum.innerHTML = p1summedsingulars;
    if (p1summedsingulars >= 63) {
      document.getElementById("bonus1").innerHTML = "50";
    }

    let p2sum = document.getElementById("p2sum");
    tempArray2 = tempArray2.slice(0, 6);
    let player2_singulars = tempArray2.map((element) => Number(element.value));
    p2summedsingulars = player2_singulars.reduce(
      (acc, value) => acc + value,
      0
    );
    p2sum.innerHTML = p2summedsingulars;
    if (p2summedsingulars >= 63) {
      document.getElementById("bonus2").innerHTML = "50";
    }

    let p3sum = document.getElementById("p3sum");
    tempArray3 = tempArray3.slice(0, 6);
    let player3_singulars = tempArray3.map((element) => Number(element.value));
    p3summedsingulars = player3_singulars.reduce(
      (acc, value) => acc + value,
      0
    );
    p3sum.innerHTML = p3summedsingulars;
    if (p3summedsingulars >= 63) {
      document.getElementById("bonus3").innerHTML = "50";
    }

    let p4sum = document.getElementById("p4sum");
    tempArray4 = tempArray4.slice(0, 6);
    let player4_singulars = tempArray4.map((element) => Number(element.value));
    p4summedsingulars = player4_singulars.reduce(
      (acc, value) => acc + value,
      0
    );
    p4sum.innerHTML = p4summedsingulars;
    if (p4summedsingulars >= 63) {
      document.getElementById("bonus4").innerHTML = "50";
    } */
  });

  game1.sumTotal()

  let diceArray = Array.from(document.getElementsByClassName("dice"));

  /*diceButton.addEventListener("click", function (event) {
    filteredArray = diceArray.filter((element) => {
      return element.checked;
    });

    console.log(filteredArray);
  });
*/
  btnDone.addEventListener("click", function (event) {
    game1.togglePlayers();
    console.log(game1.playersArray);
  });
  buttonThrow.addEventListener("click",function(event){
  var randomNumber1 = Math.floor(Math.random() * 6) + 1; 
  var randomNumber2 = Math.floor(Math.random() * 6) + 1; 
  var randomNumber3 = Math.floor(Math.random() * 6) + 1; 
  var randomNumber4 = Math.floor(Math.random() * 6) + 1; 
  var randomNumber5 = Math.floor(Math.random() * 6) + 1; 
  document.querySelector(".img1").setAttribute("src", 
      "dice" + randomNumber1 + ".png"); 

  document.querySelector(".img2").setAttribute("src", 
      "dice" + randomNumber2 + ".png"); 
  
  document.querySelector(".img3").setAttribute("src", 
      "dice" + randomNumber3 + ".png"); 
  
  document.querySelector(".img4").setAttribute("src", 
      "dice" + randomNumber4 + ".png"); 
  
  document.querySelector(".img5").setAttribute("src", 
      "dice" + randomNumber5 + ".png"); 
});
  
});
