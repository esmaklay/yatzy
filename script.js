document.addEventListener("DOMContentLoaded", function (e) {
    let sumButton = document.getElementById("sumButton");

    let tempArray1 = Array.from(document.getElementsByClassName("player1"));
    let tempArray2 = Array.from(document.getElementsByClassName("player2"));
    let tempArray3 = Array.from(document.getElementsByClassName("player3"));
    let tempArray4 = Array.from(document.getElementsByClassName("player4"));
  
    
    sumButton.addEventListener("click", function(e) {
        let p1sum = document.getElementById("p1sum");
        let player1_singulars = tempArray1.map(element => Number(element.value));
        p1summedsingulars = player1_singulars.reduce(((acc, value) => acc + value), 0)
        p1sum.innerHTML = p1summedsingulars
        if (p1summedsingulars >=63) {
            document.getElementById("bonus1").innerHTML = "50";
        };
        
        let p2sum = document.getElementById("p2sum");
        let player2_singulars = tempArray2.map(element => Number(element.value));
        p2summedsingulars = player2_singulars.reduce(((acc, value) => acc + value), 0)
        p2sum.innerHTML = p2summedsingulars
        if (p2summedsingulars >=63) {
            document.getElementById("bonus2").innerHTML = "50";
        };

        let p3sum = document.getElementById("p3sum");
        let player3_singulars = tempArray3.map(element => Number(element.value));
        p3summedsingulars = player3_singulars.reduce(((acc, value) => acc + value), 0);
        p3sum.innerHTML = p3summedsingulars
        if (p3summedsingulars >=63) {
            document.getElementById("bonus3").innerHTML = "50";
        };

        let p4sum = document.getElementById("p4sum");
        let player4_singulars = tempArray4.map(element => Number(element.value));
        p4summedsingulars = player4_singulars.reduce(((acc, value) => acc + value), 0);
        p4sum.innerHTML = p4summedsingulars
        if (p4summedsingulars >=63) {
            document.getElementById("bonus4").innerHTML = "50";
        };

    });




    let diceArray = Array.from(document.getElementsByClassName("dice"));
    
    diceButton.addEventListener("click", function(event) {
        filteredArray = diceArray.filter(element => {
            return element.checked;
        });
        
        console.log(filteredArray);
        
   })












})