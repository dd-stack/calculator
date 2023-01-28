const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.display');
const buttons = calculator.querySelector('.box2');
const operator = calculator.querySelector('.operator');
const history = document.querySelector('.history');
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

    if (target.matches('button')){  //버튼이 선택되었을 때,

        if (action === 'num' || action === 'zero'){  //숫자 버튼이라면,
            if (display.textContent === '0' || previousKey === 'operator' || previousKey === 'confirm') {  
            //디스플레이에 0이 찍혀있거나, 먼저 눌린 키가 연산 버튼이나 컨펌 버튼이라면,
                display.textContent = buttonContent;  //누른 버튼의 숫자가 나옴.
            } else {
                display.textContent = display.textContent + buttonContent;  //아니라면 찍혀있는 숫자 뒤에 누른 버튼의 숫자가 추가됨.
            }
            history.textContent = history.textContent + buttonContent
            previousKey = 'number';
        }

        if (action === 'operator') {  //연산 버튼이라면,
            if (firstNum && operatorForAdvanced && previousKey !== 'operator' && previousKey !== 'calculate') {
                display.textContent = calculate(firstNum, operatorForAdvanced, display.textContent);
            }
            firstNum = display.textContent;
            operatorForAdvanced = buttonContent;

            history.textContent = history.textContent + buttonContent;
            previousKey = 'operator';
        }

        if (action === 'decimal') {  //소수점 버튼이라면,
            if (!display.textContent.includes('.') && previousKey !== 'operator') {
                display.textContent = display.textContent + '.';
            } else if (previousKey === 'operator') {
                display.textContent = '0.';
            }
            history.textContent = history.textContent + buttonContent;
            previousKey = 'decimal';
        }

        if (action === 'clear') {  //AC 버튼이라면,
            firstNum = undefined;
            operatorForAdvanced = undefined;
            previousNum = undefined;
            display.textContent = '0';

            history.textContent = '';
            previousKey = 'clear';
        }

        if (action === 'confirm') {  //컨펌(엔터) 버튼이라면,
            if (firstNum) {
                if (previousKey === 'calculate') {
                    display.textContent = calculate(display.textContent, operatorForAdvanced, previousNum);
                } else {
                    previousNum = display.textContent;
                    display.textContent = calculate(firstNum, operatorForAdvanced, display.textContent);
                }
            }
            history.textContent = `${history.textContent} = ${display.textContent}`;
            previousKey = 'confirm';
        }
    }
});