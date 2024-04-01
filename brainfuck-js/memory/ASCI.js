var Memory = require('../memory.js');

function ASCI() {
    Memory.call(this);

    /////////////////////////////////////////////

    this.next = function () {
        this._pointer += 1;
        return this;
    }

    this.previous = function () {
        this._pointer -= 1;
        return this;
    }

    this.get = function () {
        if (typeof this._data[this._pointer] !== 'undefined') {
            return this._data[this._pointer];
        } else {
            return 0;
        }
    }

    this.set = function (_value) {
        if (_value < 0) {
            _value = 0;
        }
        this._data[this._pointer] = _value % 256;
        return this;
    }
    
    this.increase = function () {
        if (typeof this._data[this._pointer] !== 'undefined') {
            this._data[this._pointer] += 1;
            this._data[this._pointer] = this._data[this._pointer] % 256;
        } else {
            this._data[this._pointer] = 1;
        }
        return this;
    }
    
    this.decrease = function () {
        if (typeof this._data[this._pointer] !== 'undefined') {
            this._data[this._pointer] = this._data[this._pointer] > 1 ? this._data[this._pointer] - 1 : 0;
        } else {
            this._data[this._pointer] = 0;
        }
        return this;
    }
};

ASCI.prototype = Object.create(Memory);
ASCI.prototype.constructor = ASCI;

module.exports = ASCI;