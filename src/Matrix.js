class Matrix {
    /**
     * @param { Number } rows
     * @param { Number } cols
     */
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.values = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
        return this;
    }

    static fromArray(arr) {
        return new Matrix(arr.length, 1).map((e, i) => arr[i]);
    }

    /**
     * @param { Matrix } _matrix
     */
    add(_matrix) {
        if (this.rows != _matrix.rows || this.cols != _matrix.cols) {
            throw Error("Rows and cols of matrix must match.");
        }
        this.map((val, i, j) => val + _matrix.values[i][j]);
        return this;
    }

    randomize() {
        return this.map(e => Math.random() * 2 - 1);
    }

    subtract(_matrix) {
        if (this.rows != _matrix.rows || this.cols != _matrix.cols) {
            throw Error("Rows and cols of matrix must match.");
        }
        this.map((val, i, j) => val - _matrix.values[i][j]);
        return this;
    }

    /**
     * @param { Matrix } matrix1
     * @param { Matrix } matrix2
     */
    static subtract(matrix1, matrix2) {
        if (matrix1.rows !== matrix2.rows || matrix1.cols !== matrix2.cols) {
            throw Error("Rows and cols of matrix must match.");
        }
        let result = new Matrix(matrix1.rows, matrix1.cols);
        result.map((val, i, j) => matrix1.values[i][j] - matrix2.values[i][j]);
        return result;
    }

    /**
     * @param { Number | Matrix} n
     */
    scalar(n) {
        if (n instanceof Matrix) {
            this.map((val, i, j) => val * n.values[i][j]);
        } else {
            this.map(val => val * n);
        }
        return this;
    }

    /**
     * @param { Matrix } matrix1
     * @param { Matrix } matrix2
     */
    static dot(matrix1, matrix2) {
        if (matrix1.cols != matrix2.rows) {
            throw Error("Cols of the matrix1 must me equal to rows of matrix2");
        }
        let _m = new Matrix(matrix1.rows, matrix2.cols);
        for (let i = 0; i < _m.rows; i++) {
            for (let j = 0; j < _m.cols; j++) {
                let sum = 0;
                for (let r = 0; r < matrix1.cols; r++) {
                    sum += matrix1.values[i][r] * matrix2.values[r][j];
                }
                _m.values[i][j] = sum;
            }
        }
        return _m;
    }

    /**
     * @param { Matrix } matrix
     */
    static transpose(matrix) {
        let _m = new Matrix(matrix.cols, matrix.rows);
        _m.map((val, i, j) => matrix.values[j][i]);
        return _m;
    }

    copy() {
        let m = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                m.values[i][j] = this.values[i][j];
            }
        }
        return m;
    }

    map(f) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.values[i][j] = f(this.values[i][j], i, j);
            }
        }
        return this;
    }

    /**
     *
     * @param {Matrix} matrix
     * @param {Function} f
     */
    static map(matrix, f) {
        return new Matrix(matrix.rows, matrix.cols).map((e, i, j) =>
            f(matrix.values[i][j], i, j)
        );
    }

    toArray() {
        let arr = [];
        this.map(x => arr.push(x));
        return arr;
    }

    print() {
        console.log(this.values);
    }
}

module.exports = Matrix;
