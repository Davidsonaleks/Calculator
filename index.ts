type TCalculatorProps = {
  board: HTMLDivElement | null
  buttons: NodeListOf<Element>
}

class Calculator {
  board: HTMLDivElement
  buttons: Element[]

  constructor(props: TCalculatorProps) {
    if (!props.board) {
      throw new Error("No elements on constructor")
    }
    this.board = props.board
    this.buttons = Array.from(props.buttons)
  }

  get value() {
    return this.board.innerHTML
  }
  set value(str: string) {
    this.board.innerHTML = this.board.innerHTML + str
  }

  input() {
    this.buttons.forEach(button => {
      const buttonValue = button.innerHTML
      if (!isNaN(Number(buttonValue))) {
        this.inputNumber(button)
      } else {
        this.inputOperator(button)
      }
    })
  }

  inputNumber(el: Element) {
    el.addEventListener("click", () => (this.value = el.innerHTML))
  }

  inputOperator(el: Element) {
    const previousValue = this.value[this.value.length - 1]
    el.addEventListener("click", () => {
      if (previousValue === el.innerHTML) return
      if (isNaN(Number(previousValue))) {
      }
      this.value = el.innerHTML
    })
  }

  start() {
    this.input()
  }
}

const calculator = new Calculator({
  board: document.querySelector(".calculator__board"),
  buttons: document.querySelectorAll("#value"),
})
calculator.start()
