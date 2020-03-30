"use strict";
var Calculator = /** @class */ (function () {
    function Calculator(props) {
        if (!props.board || !props.delete || !props.compute) {
            throw new Error("No elements on constructor");
        }
        this.board = props.board;
        this.deleteButton = props.delete;
        this.computeButton = props.compute;
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
    Calculator.prototype.isNumber = function (value) {
        if (value === "(" || value === ")")
            return true;
        return !isNaN(Number(value));
    };
    Calculator.prototype.input = function () {
        var _this = this;
        this.buttons.forEach(function (button) {
            var buttonValue = button.innerHTML;
            if (_this.isNumber(buttonValue)) {
                _this.inputNumber(button);
            }
            else {
                _this.inputOperator(button);
            }
        });
    };
    Calculator.prototype.inputNumber = function (el) {
        var _this = this;
        el.addEventListener("click", function () {
            console.log(typeof _this.value);
            if (typeof _this.value === "number")
                _this.board.innerHTML = "";
            _this.value = el.innerHTML;
        });
    };
    Calculator.prototype.inputOperator = function (el) {
        var _this = this;
        el.addEventListener("click", function () {
            var previousValue = _this.value[_this.value.length - 1];
            if (previousValue === el.innerHTML)
                return;
            if (!_this.isNumber(previousValue)) {
                _this.board.innerHTML = _this.value.substring(0, _this.value.length - 1) + el.innerHTML;
            }
            else {
                _this.value = el.innerHTML;
            }
        });
    };
    Calculator.prototype.delete = function () {
        var _this = this;
        this.deleteButton.addEventListener("click", function () { return (_this.board.innerHTML = _this.value.substring(0, _this.value.length - 1)); });
    };
    Calculator.prototype.compute = function () {
        var _this = this;
        this.computeButton.addEventListener("click", function () { return (_this.board.innerHTML = eval(_this.value)); });
    };
    Calculator.prototype.start = function () {
        this.input();
        this.delete();
        this.compute();
    };
    return Calculator;
}());
var calculator = new Calculator({
    board: document.querySelector(".calculator__board"),
    buttons: document.querySelectorAll("#value"),
    delete: document.querySelector("#delete"),
    compute: document.querySelector("#compute"),
});
calculator.start();
