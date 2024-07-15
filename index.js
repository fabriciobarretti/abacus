// let header = document.getElementById("ex-header");
// let result = document.getElementById("ex-result");
let table = document.getElementById("ex-table");

table.innerHTML = ``;

let exercise = [];
exercise[0] = 0;
let exSize = 3;
let counter = 0;

function testIdentification(){
    // It says it's base 5 when I'm adding 5 or more and it fits the column
    let bases = identifyBase(6,"sub",7); 
    console.log(`Base 5: ${bases[5]} | Base 10: ${bases[10]}`);
};
testIdentification();

function genExercise (size){
    for (i=1;i<=exSize;i++){
        let operation = operationGen();
        
        // Defining the number and printing it on console
        exercise[i] = Math.floor(Math.random() * 10) * operation;
        console.log(exercise[i]);
        table.innerHTML += `<tr>${exercise[i]}</tr>`;
        
        // Updating the result
        exercise[0] += exercise[i];
        
        counter++;
        console.log("Counter: " + counter);
        
        // Calculating the result
        if (i == exSize){
            console.log("Result: " + exercise[0]);
            table.innerHTML += `<tr>Result: ${exercise[0]}</tr>`;
        }
    }
    };

    function operationGen () {
        let operation;
        let random = Math.random();
        
        if (random<=0.5){
            operation = 1;
        } else {
            operation = -1;
        }
    
        console.log("Operation: " + operation);
        return operation;
    };

    function identifyBase (number1, operation, number2){
        let number1OnAbacus = convertToAbacus(number1);
        let base = [];

        base[5] = false;
        base[10] = false;
        
        if (operation == "sub" && number2 <= number1 && number2 <= 4 && number2>number1OnAbacus[1]){
            base[5] = true;
        } else if (operation == "sub" && number2 > number1){
            base[10] = true
        }

        if (operation == "add" && ((number1 + number2) <= 9) && (number2 > (4 - number1OnAbacus[1]))){
            base[5] = true;
        } else if (operation == "add" && (number1 + number2) > 9){
            base[10] = true;
        }

        return base;
    };

    function convertToAbacus (number){

        // beads[0] = 5-bead amount, beads[1] = 1-bead amount
        let beads = [];
        beads[0] = 0;

        if (number >= 5){
            beads[0] = 1;
            beads[1] = number - 5;
        } else {
            beads[1] = number;
        }

        return beads;
    }