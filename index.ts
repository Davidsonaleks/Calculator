type TCalculatorProps = {
  board: HTMLDivElement | null
  buttons: NodeListOf<Element>
  delete: HTMLButtonElement | null
  compute: HTMLButtonElement | null
}

class Calculator {
  board: HTMLDivElement
  deleteButton: HTMLButtonElement
  computeButton: HTMLButtonElement
  buttons: Element[]

  constructor(props: TCalculatorProps) {
    if (!props.board || !props.delete || !props.compute) {
      throw new Error("No elements on constructor")
    }
    this.board = props.board
    this.deleteButton = props.delete
    this.computeButton = props.compute
    this.buttons = Array.from(props.buttons)
  }

  get value() {
    return this.board.innerHTML
  }
  set value(str: string) {
    this.board.innerHTML = this.board.innerHTML + str
  }

  isNumber(value: string) {
    if (value === "(" || value === ")") return true
    return !isNaN(Number(value))
  }

  input() {
    this.buttons.forEach(button => {
      const buttonValue = button.innerHTML
      if (this.isNumber(buttonValue)) {
        this.inputNumber(button)
      } else {
        this.inputOperator(button)
      }
    })
  }

  inputNumber(el: Element) {
    el.addEventListener("click", () => {
      console.log(typeof this.value)
      if (typeof this.value === "number") this.board.innerHTML = ""
      this.value = el.innerHTML
    })
  }

  inputOperator(el: Element) {
    el.addEventListener("click", () => {
      const previousValue = this.value[this.value.length - 1]
      if (previousValue === el.innerHTML) return
      if (!this.isNumber(previousValue)) {
        this.board.innerHTML = this.value.substring(0, this.value.length - 1) + el.innerHTML
      } else {
        this.value = el.innerHTML
      }
    })
  }

  delete() {
    this.deleteButton.addEventListener(
      "click",
      () => (this.board.innerHTML = this.value.substring(0, this.value.length - 1))
    )
  }
  compute() {
    this.computeButton.addEventListener("click", () => (this.board.innerHTML = eval(this.value)))
  }

  start() {
    this.input()
    this.delete()
    this.compute()
  }
}

const calculator = new Calculator({
  board: document.querySelector(".calculator__board"),
  buttons: document.querySelectorAll("#value"),
  delete: document.querySelector("#delete"),
  compute: document.querySelector("#compute"),
})
calculator.start()
