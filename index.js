let table = document.getElementById("ex-table");

table.innerHTML = ``;

// testIdentification();
// genExercise(3);

// Isert base as a parameter here later in order to be possible for the user to customize the calculations
function genExercise (size){ 
    let exercise = [];
    exercise[0] = 0; // This index stores the result of the calculation
    let opBase;

    for (i=1;i<=size;i++){
        console.log(`STEP #` + i);
        let operation = operationGen();
        
        // Defining the number and printing it on console
        if (i == 1){
            exercise[i] = Math.floor(Math.random() * 9) + 1; //Forces the first to be positive and greater than 0
            exercise[0] += exercise[i];
            console.log("Generated number:" + exercise[0]);
        } else {
            exercise[i] = (Math.floor(Math.random() * 9) + 1) * operation.multiplier;
            console.log("Generated number:" + exercise[i]);
            opBase = identifyBase(exercise[0],operation,exercise[i]);
            exercise[0] += exercise[i];
        }

        if (i > 1){
            console.log("Base 5: " + opBase.isBase5);
            console.log("Base 10: " + opBase.isBase10);
        }

        

        // This would create a Base-5 exercise
        // op while (!opBase.isBase5){
        // op     exercise[i] = Math.floor(Math.random() * 10) * operation;
        // //     let reviewedBase = identifyBase(abacusNumber,operation,exercise[i]);
        // //     console.log("Second number base: " + reviewedBase);
        // //     console.log("Second 10umber base: " + reviewedBas10);

        // //     if (reviewedBase.isBase5) break;
        // // };



        // This one would check if the operation doesn't result in negative number before moving forward
        // if (abacusNumber + exercise[i] < 0){
        //     break
        // } else if (opBase.isBase5){
        //     abacusNumber += exercise[i];
        // } else {
        //     break
        // }

        
        // I guess it's not working
        table.innerHTML += `<tr>${exercise[i]}</tr>`;
        
        // Calculating the result
        
        
        // Printing the result [needs fix]
        if (i == size){
            console.log("Result: " + exercise[0]);
            table.innerHTML += `<tr>Result: ${exercise[0]}</tr>`;
        }
    }
};

function operationGen () {
        let operation = {
            name: null,
            multiplier: null,
            symbol: null,
            isBase5: null,
            isBase10: null
        };

        let random = Math.random();
        
        if (random<=0.5){
            operation.multiplier = 1;
            operation.symbol = "+";
            operation.name = "add";
        } else {
            operation.multiplier = -1;
            operation.symbol = "-";
            operation.name = "sub"
        }
        
        return operation;
};

// CHECK BASE10 SUB WHEN numberonabacus>10|
function identifyBase (number1, op, number2){
    let number1OnAbacus = convertToAbacus(number1);
    let number2OnAbacus = convertToAbacus(number2);
    

    if (op.name == "sub" && (number2 <= number1) && (number2 <= 4) && (number2 > number1OnAbacus.bead1)){
        op.isBase5 = true;
    } else if (op.name == "sub" && number2 > number1){
        op.isBase10 = true
    }

    if (op.name == "add" && ((number1 + number2) <= 9) && (number1OnAbacus.bead1 + number2OnAbacus.bead1 > 4)){
        op.isBase5 = true;
    } else if (op.name == "add" && (number2 <= 9) && (number1 + number2) > 9){
        op.isBase10 = true;
    }

    console.log("IDENTIFY BASE OBJECT: ");
    console.log(op);
    console.log(`Number 1: ${number1} | Number 2: ${number2}`);

    return op;
};

function testIdentification(){
    let op = {
        name: "add",
        isBase5: false,
        isBase10: false
    }

    op = identifyBase(1,op,9);
    
    console.log(`Base 5: ${op.isBase5} | Base 10: ${op.isBase10}`);
};

convertToAbacus(123);

// CONVERTING BIG NUMBERS TO ABACUS RODS
function convertToAbacus (number){
    let splitNumber = number.toString().split('').map(Number); // puts integer digits into an array
    console.log(splitNumber);

    let rod = [{
        wholeNumber: splitNumber,
        bead1: 0,
        bead5: 0,
    }];

    if (number >= 5){
        rod.bead5 = 1;
        rod.bead1 = number - 5;
    } else {
        rod.bead1 = number;
    };

    return rod;
};