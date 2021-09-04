const calculator = document.querySelector("#calculator");
var caldisplay = document.querySelector('#display');

calculator.addEventListener('click',(e)=>{
    if(e.target.tagName == "BUTTON"){
        const key = e.target.innerHTML;
        const previouskeytype = calculator.dataset.previousKeyType;
        const action = e.target.dataset.action;

        if(action == undefined){
            if(caldisplay.value == "0" || previouskeytype == "operator" || previouskeytype == "calculate"){
                caldisplay.value = key;
            }
            else{
                caldisplay.value += key;
            }
            calculator.dataset.previousKeyType = "";
        }
        else if(action == "add" || action == "subtract" || action == "multiply" || action == "divide" || action == "modulo"){
            if(previouskeytype == "dot"){
                caldisplay.value = caldisplay.value.slice(0,-1);
            }
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = caldisplay.value;

            
            if(firstValue && operator && previouskeytype != "operator" && previouskeytype != "calculate"){
                caldisplay.value = calculate(firstValue,secondValue,operator);
            }
            
            calculator.dataset.previousKeyType = 'operator'; // adding custom attribute 
            calculator.dataset.operator = action;
            calculator.dataset.firstValue = caldisplay.value;

        }
        else if(action == "squareRoot"){
            let result = parseFloat(caldisplay.value);
            result = Math.sqrt(result);
            caldisplay.value = result;
        }
        else if(action == "clear"){
            caldisplay.value = "0";
            delete calculator.dataset.previousKeyType;
            delete calculator.dataset.firstValue;
            delete calculator.dataset.modvalue;
            delete calculator.dataset.operator;
        }
        else if(action == "backspace"){
            caldisplay.value = caldisplay.value.slice(0,-1);
            if(caldisplay.value == ""){
                caldisplay.value = "0";
            }
        }
        else if(action == "equals"){
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = caldisplay.value;

            if(firstValue){
                if(previouskeytype=="calculate"){
                    firstValue = caldisplay.value;
                    secondValue = calculator.dataset.modvalue;
                }
                caldisplay.value = calculate(firstValue,secondValue,operator);
            }
            calculator.dataset.modvalue = secondValue;
            calculator.dataset.previousKeyType = "calculate";
        }
        else if(action == "decimal"){
            if(previouskeytype == "operator"){
                caldisplay.value  = "0";
            }
            else if(!caldisplay.value.includes('.')){
                caldisplay.value += '.';
                calculator.dataset.previousKeyType = "dot";
            }
        }
    }
});

const calculate = (n1,n2,operator) => {
    let result = "";

    if(operator == "add"){
        result = parseFloat(n1) + parseFloat(n2);
    }
    else if(operator == "subtract"){
        result = parseFloat(n1) - parseFloat(n2);
    }
    else if(operator == "multiply"){
        result = parseFloat(n1) * parseFloat(n2);
    }
    else if(operator == "divide"){
        result = parseFloat(n1) / parseFloat(n2);
    }
    else if(operator == "modulo"){
        result = parseFloat(n1) % parseFloat(n2);
    }
   
    return result;
}
