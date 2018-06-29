class ActivationFunction {

    /**
     * @param {Function} f
     * @param {Function} df
     */
    constructor(f, df) {
        this.f = f;
        this.df = df;
    }
}


const sigmoid = new ActivationFunction(
    x => 1 / (1 + Math.exp(-x)),
    y => y * (1 - y)
);

const tanh = new ActivationFunction(
    x => Math.tanh(x),
    y => 1 - (y * y)
)

module.exports = {
    ActivationFunction,
    sigmoid,
    tanh
};
