var Code = require('./code.js');

function brainfuck(_memory) {
    this.memory = _memory;
    this.code = new Code();
    this._stop = false;
    this._isRunning = false;

    this._onOutput = function (_o) {
        process.stdout.write(String.fromCharCode(_o));
     };
    
    this.onOutput = function (_func) {
        this._onOutput = _func;
        return this;
    }
    this.onInput = function (_func) {
        this._onInput = _func;
        return this;
    }

    this.stop = function () {
        this._stop = true;
    }

    this.isRunning = function () {
        return this._isRunning;
    }

    this.reset = function () {
        this.memory.reset = 0;
        this.code.reset();
        return this;
    };

    this.step = function (_callback) {
        var cmd = this.code.get();

        if (typeof cmd === 'undefined') {
            this._run(_callback, false);
            return false;
        } else {
            if (cmd === '>') {
                this.memory.next();
            } else if (cmd === '<') {
                this.memory.previous();
            } else if (cmd === '+') {
                this.memory.increase();
            } else if (cmd === '-') {
                this.memory.decrease();
            } else if (cmd === '.') {
                this._runAsync(this._onOutput, this.memory.get());
            } else if (cmd === ',') {
                this.memory.set(this._run(this._onInput));
            } else if (cmd === '[' && this.memory.get() === 0) {
                this.code.jumpMatching();
            } else if (cmd === ']') {
                this.code.jumpMatching();
                this.code.previous();
            }

            this.code.next();
            this._run(_callback, true);
            return true;
        }
    }

    this.run = function (_callback) {
        
        this._isRunning = true;

        if (this._stop) {
            this._isRunning = false;
            this._run(_callback);
        } else {
            this._stop = this._stop || !this.step();
            this._runAsync(this.run, _callback);                
        } 
    }

    this._runAsync = function (/*_func, _arg1, _arg2...*/) {
        var that = this,
            args = Array.prototype.slice.call(arguments),
            func = args.shift();
        
        setImmediate(function () {
            func.apply(that, args);
        });
    }

    this._run = function (/*_func, _arg1, _arg2...*/) {
        var args = args = Array.prototype.slice.call(arguments),
            func = args.shift();
        if (typeof func === 'function') {
            return func.apply(this, args);
        }
    }
};

module.exports = brainfuck;