document.addEventListener("DOMContentLoaded", function (e) {
    let button = document.getElementById("button");
    let sumpl11 = [];

    button.addEventListener("click", function (e) {

        sumpl11.push(player1_ones.valueAsNumber, player1_twos.valueAsNumber, player1_threes.valueAsNumber, player1_fours.valueAsNumber, player1_fives.valueAsNumber, player1_sixes.valueAsNumber);
        let sumpl1 = sumpl11.reduce(((accumulated, value) => accumulated + value), 0);

        console.log(sumpl1);

    })
})