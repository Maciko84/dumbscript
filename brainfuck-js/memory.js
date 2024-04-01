function memory() {
    this._pointer = 0;
    this._data = {};

    /////////////////////////////////////////////

    this.reset = function () {
        this._pointer = 0;
    }
    
    this.clear = function () {
        this._pointer = 0;
        this._data = {};
    }
}

module.exports = memory;