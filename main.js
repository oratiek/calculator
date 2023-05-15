function is_digit(element) {
    if (isNaN(parseInt(element))) {
        return false 
    } else {
        return true
    }
        
}

function calc(formula) {
    console.log("formula", formula);
    var splited = formula.split(" ");
    var stack = new Array();
    for (let i=0; i<splited.length; i++) {
        //console.log(stack);
        element = splited[i];
        if (is_digit(element)) {
            stack.push(parseInt(element));
        } else {
            second_digit = stack.pop();
            first_digit = stack.pop(); 
            if (element == "+") {
                //console.log("debug+");
                stack.push(first_digit + second_digit);
            } else if (element == "-") {
                //console.log("debug-");
                stack.push(first_digit - second_digit);
            } else if (element == "*") {
                //console.log("debug*");
                stack.push(first_digit * second_digit);
            } else if (element == "/") {
                //console.log("debug/");
                stack.push(first_digit / second_digit);
            } else {
                throw "Formula Syntax Error";
            }
        }
    }

    console.log(stack[0]);
}

formula = "100 2 3 + 4 5 + * -";
formula = "1 2 + 3 +"
calc(formula);
