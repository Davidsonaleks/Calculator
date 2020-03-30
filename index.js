"use strict";
var Calculator = /** @class */ (function () {
    function Calculator(props) {
        if (!props.board) {
            throw new Error("No elements on constructor");
        }
        this.board = props.board;
        this.buttons = Array.from(props.buttons);
    }
    Object.defineProperty(Calculator.prototype, "value", {
        get: function () {
            return this.board.innerHTML;
        },
        set: function (str) {
            this.board.innerHTML = this.board.innerHTML + str;
        },
        enumerable: true,
        configurable: true
    });
    Calculator.prototype.input = function () {
        var _this = this;
        this.buttons.forEach(function (button) {
            var buttonValue = button.innerHTML;
            if (!isNaN(Number(buttonValue))) {
                _this.inputNumber(button);
            }
            else {
                _this.inputOperator(button);
            }
        });
    };
    Calculator.prototype.inputNumber = function (el) {
        var _this = this;
        el.addEventListener("click", function () { return (_this.value = el.innerHTML); });
    };
    Calculator.prototype.inputOperator = function (el) {
        var _this = this;
        el.addEventListener("click", function () {
            if (_this.value[_this.value.length - 1] === el.innerHTML)
                return;
            _this.value = el.innerHTML;
        });
    };
    Calculator.prototype.start = function () {
        this.input();
    };
    return Calculator;
}());
var calculator = new Calculator({
    board: document.querySelector(".calculator__board"),
    buttons: document.querySelectorAll("#value"),
});
calculator.start();
