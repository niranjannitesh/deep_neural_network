const Matrix = require('./Matrix');
const Layer = require('./Layer');

class Model {

    /**
     * Create a new neural network model
     * @param {Function} err
     * @param {Number} learning_rate
     */
    constructor(err, learning_rate) {
        this.err = err;
        this.learning_rate = learning_rate;
        this.layers = [];
    }

    /**
     * Add new layer to the model
     * @param {Layer} layer
     */
    addLayer(layer) {
        if (this.layers.length >= 1) {
            let prev = this.layers[this.layers.length - 1];
            // Intialize the weights
            prev.weights = new Matrix(layer.nodes, prev.nodes);
            layer.bias = new Matrix(layer.nodes, 1);
        }
        this.layers.push(layer);
    }

    /**
     * Calculate the output of the network
     * @param {Array} inputs
     */
    predict(input) {
        let output = Matrix.fromArray(input);
        for (let i = 0, len = this.layers.length - 1; i < len; i++) {
            let layer = this.layers[i];
            let next_layer = this.layers[i + 1];
            output = layer.propagate(output);
            output.add(next_layer.bias);
            output.map(next_layer.activationFunction.f);
        }
        this.layers[this.layers.length - 1].data = output;
        return output;
    }


    /**
     * Train the network
     * @param {Array} inputs Arrays of inputs
     * @param {Array} outputs Arrays of outputs
     */
    train(inputs, outputs) {
        if (inputs.length !== outputs.length) {
            return Error("Length of inputs must be equal to length of output.");
        }

        let loss = 0;

        for (let i = 0; i < inputs.length; i++) {

            let x = inputs[i];
            let y = Matrix.fromArray(outputs[i]);

            let prediction = this.predict(x).copy();

            // calculate the output layer error
            let final_error = this.err(y, prediction);

            loss += Math.pow(final_error.values[0][0], 2);

            // loop over the hidden and input layers
            for (let j = this.layers.length - 2; j >= 0; j--) {

                // current layer
                let layer = this.layers[j];
                // next layer
                let next_layer = this.layers[j + 1];

                // copy the error
                let hidden_error = final_error.copy();

                // layer_error * next_layer_derivative * layer_data
                let gradient = Matrix.map(next_layer.data, next_layer.activationFunction.df);
                gradient.scalar(hidden_error);
                gradient.scalar(this.learning_rate);

                let deltas = Matrix.dot(gradient, Matrix.transpose(layer.data));
                layer.weights.add(deltas);
                next_layer.bias.add(gradient);


                final_error = Matrix.dot(Matrix.transpose(this.layers[j].weights), final_error);
            }

        }

        return (Math.sqrt(loss) / inputs.length);

    }

}

module.exports = Model;
