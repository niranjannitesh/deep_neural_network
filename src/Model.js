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
        prev.weights = new Matrix(layer.nodes, prev.nodes).randomize();
        layer.bias = new Matrix(layer.nodes, 1).randomize();
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
     * @param {Array} inputs Array of inputs
     * @param {Array} outputs Array of outputs
     */
    train(inputs, outputs) {
      let x = inputs;
      let y = Matrix.fromArray(outputs);

      let prediction = this.predict(x).copy();

      let final_error = this.err(y, prediction);

      for (let j = this.layers.length - 2; j >= 0; j--) {
        let layer = this.layers[j];
        let next_layer = this.layers[j + 1];

        let hidden_error = final_error.copy();

        let gradient = Matrix.map(
          next_layer.data,
          next_layer.activationFunction.df
        );
        gradient.scalar(hidden_error);
        gradient.scalar(this.learning_rate);

        let deltas = Matrix.dot(gradient, Matrix.transpose(layer.data));
        layer.weights.add(deltas);
        next_layer.bias.add(gradient);

        final_error = Matrix.dot(
          Matrix.transpose(this.layers[j].weights),
          final_error
        );
      }
    }
  }


module.exports = Model;
