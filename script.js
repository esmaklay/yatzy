document.addEventListener("DOMContentLoaded", function (e) {
    let button = document.getElementById("button");
    let sumpl11 = [];

    /* button.addEventListener("click", function (e) {

        sumpl11.push(player1_ones.valueAsNumber, player1_twos.valueAsNumber, player1_threes.valueAsNumber, player1_fours.valueAsNumber, player1_fives.valueAsNumber, player1_sixes.valueAsNumber);
        let sumpl1 = sumpl11.reduce(((accumulated, value) => accumulated + value), 0);

        console.log(sumpl1);

    })
 */
    
    let htmlcollection1 = document.getElementsByClassName("player1");
    let tempArray1 = Array.from(htmlcollection1);

    let htmlcollection2 = document.getElementsByClassName("player2");
    let tempArray2 = Array.from(htmlcollection2);

    let htmlcollection3 = document.getElementsByClassName("player3");
    let tempArray3 = Array.from(htmlcollection3);

    let htmlcollection4 = document.getElementsByClassName("player4");
    let tempArray4 = Array.from(htmlcollection4);
    
    
    button.addEventListener("click", function(e) {
        let player1_singulars = tempArray1.map(element => parseInt(element.value));
        console.log(player1_singulars);

        let player2_singulars = tempArray2.map(element => parseInt(element.value));
        console.log(player2_singulars);

        let player3_singulars = tempArray3.map(element => parseInt(element.value));
        console.log(player3_singulars);

        let player4_singulars = tempArray4.map(element => parseInt(element.value));
        console.log(player4_singulars);
    });


    //let dicecollection = document.getElementsByClassName("dice");
    let diceArray = Array.from(document.getElementsByClassName("dice"));
    //let filteredArray = [];

    diceButton.addEventListener("click", function(event) {
        filteredArray = diceArray.filter(element => {
            return element.checked;
        });
        
        console.log(filteredArray);
        
   })












})