const Model = require('./Model');
const n_Error = require('./Error');
const Layer = require('./Layer');
const { tanh, sigmoid } = require('./Activation');

const nnet = new Model(n_Error.meanSquaredError, 0.25);

nnet.addLayer(new Layer(2, sigmoid));
nnet.addLayer(new Layer(20, tanh));
nnet.addLayer(new Layer(1, sigmoid));

let inputs = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
]

let outputs = [
  [0],
  [1],
  [1],
  [0]
]


for (let i = 0; i < 300; i++) {
  let error = nnet.train(inputs, outputs);
  console.log(error);
}

console.log();
nnet.predict([0, 0]).print();
nnet.predict([0, 1]).print();
nnet.predict([1, 1]).print();
nnet.predict([1, 0]).print();

