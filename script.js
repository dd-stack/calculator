const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.display');
const buttons = calculator.querySelector('.box2');
const operator = calculator.querySelector('.operator');
let firstNum, operatorForAdvanced, previousKey, previousNum;

function calculate(n1, operator, n2){
    let result = 0;
    if(operator === '+'){
        result = Number(n1) + Number(n2);
    }else if(operator === '-'){
        result = Number(n1) - Number(n2);
    }else if(operator === '*'){
        result = Number(n1) * Number(n2);
    }else if(operator === '/'){
        result = Number(n1) / Number(n2);
    }
    return String(result);
}

buttons.addEventListener('click', function(event){
    const target = event.target;
    const action = target.classList[0];  //클릭된 HTML 엘리먼트의 클래스 정보 가져오기
    const buttonContent = target.textContent;  //클릭된 HTML 엘리먼트의 텍스트 정보 가져오기
    const buttonContainerArray = buttons.children;

    if (target.matches('button')){  //버튼이 선택되었을 때,

        for (let i = 0; i < buttonContainerArray.length; i++) {
            const childrenArray = buttonContainerArray[i].children;
            for (let j = 0; j < childrenArray.length; j++) {
                childrenArray[j].classList.remove('isPressed');
            }
        }

        if (action === 'num'){
            if (display.textContent === '0' || previousKey === 'operator' || previousKey === 'calculate') {
                display.textContent = buttonContent;
            } else {
                display.textContent = display.textContent + buttonContent;
            }
            previousKey = 'number';

            if (display.innerText.length > 20) {
                alert('Can you re-enter it within the maximum input range?');
            }
        }

        if (action === 'zero'){
            if (display.textContent === '0' || previousKey === 'operator' || previousKey === 'calculate') {
                display.textContent = buttonContent;
            } else {
                display.textContent = display.textContent + buttonContent;
            }
            previousKey = 'number';

            if (display.innerText.length > 20) {
                alert('Can you re-enter it within the maximum input range?');
            }
        }

        if (action === 'operator') {
            target.classList.add('isPressed');
            if (firstNum && operatorForAdvanced && previousKey !== 'operator' && previousKey !== 'calculate') {
                display.textContent = calculate(firstNum, operatorForAdvanced, display.textContent);
            }
            firstNum = display.textContent;
            operatorForAdvanced = buttonContent;
            previousKey = 'operator';
        }

        if (action === 'decimal') {
            if (!display.textContent.includes('.') && previousKey !== 'operator') {
                display.textContent = display.textContent + '.';
            } else if (previousKey === 'operator') {
                display.textContent = '0.';
            }
            previousKey = 'decimal';
        }

        if (action === 'clear') {
            firstNum = undefined;
            operatorForAdvanced = undefined;
            previousNum = undefined;
            display.textContent = '0';
            previousKey = 'clear';
        }

        if (action === 'confirm') {
            if (firstNum) {
                if (previousKey === 'calculate') {
                    display.textContent = calculate(display.textContent, operatorForAdvanced, previousNum);
                } else {
                    previousNum = display.textContent;
                    display.textContent = calculate(firstNum, operatorForAdvanced, display.textContent);
                }
            }
            previousKey = 'calculate';
        }
    }
});