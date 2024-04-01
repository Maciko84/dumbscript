function code() {
    this._pointer = 0;
    this._source = {};
    this._brackets = {};

    /////////////////////////////////////////////

    this.get = function () {
        if (this._pointer >= this._source.length) {
            return undefined;
        } else {
            return this._source[this._pointer];
        }
    }

    this.next = function () {
        this._pointer += 1;
        return this.get();
    }

    this.previous = function () {
        this._pointer -= 1;
        return this.get();
    }

    this.jumpMatching = function () {
        if (typeof this._brackets[this._pointer] !== 'undefined') {
            this._pointer = this._brackets[this._pointer];
        }
        return this;
    }

    this.reset = function () {
        this._pointer = 0;
    }
    
    this.clear = function () {
        this._pointer = 0;
        this._source = {};
    }

    this.source = function (_source) {
        if (typeof _source !== 'undefined') {
            this._source = _source;
            this._optimize();
            return this;
        } else {
            return this._source;
        }
    }

    /////////////////////////////////////////////

    this._optimize = function () {
        var i,
            opening,
            opened = [];
        
        this._brackets = {};

        for (i = 0; i < this._source.length; i += 1) {
            
            if (this._source[i] === '[') {
                opened.push(i);
            } else if (this._source[i] === ']') {
                opening = opened.pop();
                this._brackets[opening] = i;
                this._brackets[i] = opening;
            }
        }
    }
}

module.exports = code;