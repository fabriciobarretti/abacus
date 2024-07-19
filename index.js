    let table = document.getElementById("ex-table");

table.innerHTML = ``;

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

testIdentification();

function testIdentification(){
    let op = {
        name: "add",
        symbol: "+",
        isBase5: false,
        isBase10: false
    }
    op = identifyBase(91,op,11);
};

// CHECK BASE10 SUB WHEN numberonabacus>10|
function identifyBase (number1, op, number2){
    let number1OnAbacus = convertToAbacus(number1);
    let number2OnAbacus = convertToAbacus(number2);

    if (number2 > number1){
        return console.log("ERROR: RESULT WOULD BE A NEGATIVE NUMBER.");
    } else {
        console.log(`Operation: ${number1} ${op.symbol} ${number2}`);
    }

    // CONDITION FOR BASE10 SUMS.
    function isThereNumbersOnTheLeft (number, position){
        let isThere = false;

        for (i=position;i<number.length;i++){
            if (number[i+1] > 0){
                isThere == true;
            }
        }
    };

    
    // TO SOLVE THE PROBLEM: WHEN YOU HAVE 2-DIGIT FIRST NUMBER, THE ITERATION WILL HAVE i=2 AT SOME POINT, AND
    // YOU DON'T HAVE A [2] FOR THE SECOND NUMBER BECAUSE IT'S JUST ONE DIGIT.
    let rodsToBeChecked; 
    
    if (number1OnAbacus.length > number2OnAbacus.length){
        rodsToBeChecked = number2OnAbacus.length;
    } else {
        rodsToBeChecked = number1OnAbacus.length;
    }
    
    // TRY TO INVERT THE FOR LOOP TO START WITH THE END OF THE RODS
    // Recreate the if statement to check if the result would be negative
        for (i=0;i<rodsToBeChecked;i++){

            if (op.name == "sub" && (number2OnAbacus[i].wholeNumber <= number1OnAbacus[i].wholeNumber) && (number2OnAbacus[i].wholeNumber <= 4) && (number2OnAbacus[i].wholeNumber > number1OnAbacus[i].bead1)){
                op.isBase5 = true;
            } else if (op.name == "sub" && number2OnAbacus[i].wholeNumber > number1OnAbacus[i].wholeNumber){
                op.isBase10 = true
            }
        
            if (op.name == "add" && ((number1OnAbacus[i].wholeNumber + number2OnAbacus[i].wholeNumber) <= 9) && (number1OnAbacus[i].bead1 + number2OnAbacus[i].bead1 > 4)){
                op.isBase5 = true;
            } else if (op.name == "add" && ((number1OnAbacus[i].wholeNumber + number2OnAbacus[i].wholeNumber) > 9)){
                op.isBase10 = true;
            }

            let printingNumbers;

            if(i==0){
                printingNumbers = 10**i;
            } else {
                printingNumbers = i * (10**i);
            }
            console.log(printingNumbers);


            console.log(`Step #${i+1}: ${number1OnAbacus[i].wholeNumber*printingNumbers} ${op.symbol} ${number2OnAbacus[i].wholeNumber*printingNumbers}`);
            console.log(op);
        }

    

    return op;
};

// convertToAbacus(1234567890);

// CONVERTING BIG NUMBERS TO ABACUS RODS. THE BIGGER THE i VALUE, THE MORE TO THE LEFT ON THE ABACUS IT IS
function convertToAbacus (number){
    let splitNumber = number.toString().split('').map(Number); // puts integer digits into an array
    
    let rod = [];
    let newPositionOnAbacus;

    for (i=0;i<splitNumber.length;i++){
        newPositionOnAbacus = splitNumber.length - (i+1); // Inverts the array
        if (splitNumber[i] >= 5){
            rod[newPositionOnAbacus] = {
                wholeNumber: splitNumber[i],
                bead1: (splitNumber[i] - 5),
                bead5: 1
            };
            
        } else {
            rod[newPositionOnAbacus] = {
                wholeNumber: splitNumber[i],
                bead1: splitNumber[i],
                bead5: 0
            };
        };
    }
    return rod;
};