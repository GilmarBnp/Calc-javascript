const previousOperationText = document.querySelector('#previousOperationText')
const currentOperationText = document.querySelector('#current-operation')

const buttons = document.querySelectorAll('button')



class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = ""
    }

    // Add digit to a calculator screen
    addDigit(digit) {    
       this.currentOperation = digit;
       this.updateScreen();
    }

    // Process all calculator operations
    processOperation(operation){
        // Check if current value is empty
        if(this.currentOperationText.innerText === "" && operation !== "CE") {
            // Change operation
            if(this.previousOperationText.innerText != "") {
                this.changeOperation(operation)
            }
            return;
        }
        
        // Get current and previous value
        let operationValue;
        //era let, mas pode ser const já que não vai mudar mais os valores
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case '+':
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case '-':
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                 break;
            case 'x':
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case '/':
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case 'DEL':
                this.processDelOperator();
                break;
            case 'CE':
                this.processClearCurrentOperation();
                break;
            case '=':
                this.processEqualsOperator();
            break;
            default:
            return;                     
        }  
    }

    // Changes values of calculator screen
    updateScreen(operationValue=null, operation = null, current = null, previous = null) {// or this.currentOperationText += this.currentOperationText
        
        console.log(operationValue, operation, current, previous)

        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation   
        }else{
            // Check if value is zero, if it is just add current value
            if(previous === 0) {
                operationValue = current;
            }

            // Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }//currentOperationText é a tela da calculadora e o currentOperation é o digito que vem do addDigit()
  

    // Change math operation
    changeOperation(operation) {
        const mathOperations = ["x", "-", "+", "/"];
    
        if (!mathOperations.includes(operation)) {
          return;
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
      }

      // Delete the last digit
      processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
      }

      // Clear current operation
      processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";

      }

      processEqualsOperator() {
        let operation = this.previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation)
      }
}

const calc = new Calculator( previousOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;
        
        /* O operador +, +value >= 0 converte uma string em um número, 
            tudo que for maior ou igual a zero tranformado em número */

        /* Multiplicar por 1 também converte string em número, 
            como o zero não multiplica por 1, o zero foi colocado no or value === '0' */

          /*Se não puder ser transformado em número(como uma letra por exemplo) então é uma operação 
             ou um ponto . tipo 2.1 e vai entrar no else */
        
        if(+value >= 0 || value === '.'){
            calc.addDigit(value);
        }else{ 
            calc.processOperation(value)/* está passando os operadores que vem do forEach((btn) =>) para o método
                                            processOperation, o calc está estanciando um novo obj Calculator
                                              com o constructor*/ 
        }
    })
})
