class Calculator{
    constructor(prevOperandTextElement, curOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement
        this.curOperandTextElement = curOperandTextElement
        this.clear()
    }

    clear(){
        this.prevOperand = ''
        this.curOperand = ''
        this.operation = undefined
    }

    delete(){
        this.curOperand = this.curOperand.toString().slice(0,-1)
    }

    appendNumber(num){
        if(num === '.' && this.curOperand.includes('.'))
            return
        this.curOperand += num
    }

    chooseOperation(operation){
        if(this.curOperand === '')
            return
        if(this.prevOperand !== '')
            this.compute()
        this.operation = operation
        this.prevOperand = this.curOperand + this.operation
        this.curOperand = ''
    }

    compute(){
        let result
        const prev = parseFloat(this.prevOperand)
        const cur = parseFloat(this.curOperand)
        if(isNaN(prev) || isNaN(cur))
            return
        switch(this.operation)
        {
            case '+':
                result = prev + cur
                break
            case '-': 
                result = prev - cur
                break
            case '*': 
                result = prev * cur
                break
            case '÷': 
                result = prev / cur
                break
        }
        this.curOperand = result
        this.operation = undefined
        this.prevOperand = ''
    }

    updateDisplay(){
        this.curOperandTextElement.innerText = this.curOperand
        this.prevOperandTextElement.innerText = this.prevOperand
    }
}

const numberBtns = document.querySelectorAll('[data-number]')
const operationBtns = document.querySelectorAll('[data-operation]')
const equalsBtn = document.querySelector('[data-equals]')
const deleteBtn = document.querySelector('[data-delete]')
const allClearBtn = document.querySelector('[data-all-clear]')
const prevOperandTextElement = document.querySelector('[data-prev-opd]')
const curOperandTextElement = document.querySelector('[data-cur-opd]')

const calculator = new Calculator(prevOperandTextElement, curOperandTextElement)

numberBtns.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationBtns.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearBtn.addEventListener('click',()=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})