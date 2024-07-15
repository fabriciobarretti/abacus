let table = document.getElementById("ex-table");

table.innerHTML = ``;

// testIdentification();
genExercise(3);

function testIdentification(){
    let bases = identifyBase(2,"add",10); 
    console.log(`Base 5: ${bases.isBase5} | Base 10: ${bases.isBase10}`);
};

// Isert base as a parameter here later in order to be possible for the user to customize the calculations
function genExercise (size){ 
    let exercise = [];
    exercise[0] = null; // This index stores the result of the calculation
    let abacusNumber = 0;

    for (i=1;i<=size;i++){
        let operation = operationGen();
        
        // Defining the number and printing it on console
        exercise[i] = Math.floor(Math.random() * 10) * operation;
        let opBase = identifyBase(abacusNumber,operation,exercise[i]);

        console.log("First number base: " + opBase);
        
        while (!opBase.isBase5){
            exercise[i] = Math.floor(Math.random() * 10) * operation;
            let reviewedBase = identifyBase(abacusNumber,operation,exercise[i]);
            console.log("Second number base: " + reviewedBase);

            if (reviewedBase.isBase5) break;
        };


        console.log("Generated number:" + exercise[i]);

        // This one would check if the operation doesn't result in negative number before moving forward
        // if (abacusNumber + exercise[i] < 0){
        //     break
        // } else if (opBase.isBase5){
        //     abacusNumber += exercise[i];
        // } else {
        //     break
        // }

        table.innerHTML += `<tr>${exercise[i]}</tr>`;
        
        // Updating the result
        exercise[0] += exercise[i];
        
        // Calculating the result
        if (i == size){
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

function identifyBase (number1, op, number2){
    let number1OnAbacus = convertToAbacus(number1);
    let number2OnAbacus = convertToAbacus(number2);

    let operation = {
        name: op,
        isBase5: false,
        isBase10: false
    };
    
    if (op == "sub" && number2 <= number1 && number2 <= 4 && number2>number1OnAbacus.bead1){
        operation.isBase5 = true;
    } else if (op == "sub" && number2 > number1){
        operation.isBase10 = true
    }

    if (op == "add" && ((number1 + number2) <= 9) && (number1OnAbacus.bead1 + number2OnAbacus.bead1 > 4)){
        operation.isBase5 = true;
    } else if (op == "add" && (number2 <= 9) && (number1 + number2) > 9){
        operation.isBase10 = true;
    }

    return operation;
};

function convertToAbacus (number){
    let rod = {
        bead1: 0,
        bead5: 0,
    }

    if (number >= 5){
        rod.bead5 = 1;
        rod.bead1 = number - 5;
    } else {
        rod.bead1 = number;
    }

    return rod;
};