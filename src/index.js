class SmartCalculator {
  constructor(initialValue) {
    this.expression = initialValue; // расчётное выражение в строчном виде
    this.result = 0;
  }

  valueOf() { return this.result; }

  add(number) {
    this.expression += '+' + number;
    this.result = this.calc(this.expression);
    return this;
  }

  subtract(number) {
    this.expression += '-' + number;
    this.result = this.calc(this.expression);
    return this;
  }

  multiply(number) {
    this.expression += '*' + number;
    this.result = this.calc(this.expression);
    return this;
  }

  devide(number) {
    this.expression += '/' + number;
    this.result = this.calc(this.expression);
    return this;
  }

  pow(number) {
    this.expression += '^' + number;
    this.result = this.calc(this.expression);
    return this;
  }

  calc(expression) {
    const operator = []; // очередь операторов
    const result = []; // очередь операндов

    let isOperator = x => {
      return x == '+' || x == '-' || x == '*' || x == '/' || x == '^';
    }

    let priority = x => {
      switch (x) {
        case '+':
        case '-':
          return 1;
        case '*':
        case '/':
          return 2;
        case '^':
          return 3;
        default:
          return -1;
      }
    }

    let processOperator = (result, operator) => {
      let r = result.pop();
      let l = result.pop();

      switch (operator) {
        case '+':
          result.push(l + r);
          break;
        case '-':
          result.push(l - r);
          break;
        case '*':
          result.push(l * r);
          break;
        case '/':
          result.push(l / r);
          break;
        case '^':
          result.push(Math.pow(l, r));
          break;
      }
    }

    /* посимвольно проверяем выражение */
    for (let i = 0; i < expression.length; i++) {
      let c = expression.charAt(i);

      if (isOperator(c)) {
        /* если оператор и приоритет оператора выше предыдущего, то записываем в очередь, если такой же,
        то вычисляем предыдущую операцию. Если приоритеты равны, но это степень, то записываем в очередь */
        while (operator.length > 0
          && priority(operator[operator.length - 1]) >= priority(c)
          && c != '^') {
            processOperator(result, operator.pop());
        }
        operator.push(c);
        /* если символ - записываем в операнды */
      } else {
        let operand = '';
        while (i < expression.length && !isNaN(parseInt(expression.charAt(i)))) {
          operand += expression.charAt(i++);
        }
        --i;
        result.push(parseInt(operand));
      }
    }

    /* когда строка закончилась, берём операнды и очередь операторов и вычисляем с конца */
    while (operator.length > 0) {
      processOperator(result, operator.pop());
    }

    return result[0];
  }
}
module.exports = SmartCalculator;