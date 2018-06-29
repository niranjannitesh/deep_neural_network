const Matrix = require('./Matrix');
const { ActivationFunction } = require('./Activation');

class Layer {

    /**
     * Create a new Layer
     * @param {number} input
     * @param {ActivationFunction} activationFunction
     */
    constructor(nodes, activationFunction) {
        this.nodes = nodes;
        this.activationFunction = activationFunction;
        this.data = new Matrix(nodes, 1);
        this.weights;
        this.bias;
    }

    propagate(input) {
        // TODO: Check input size
        this.data = input;
        return Matrix.dot(this.weights, input);
    }
}

module.exports = Layer;
