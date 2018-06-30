const Model = require('./Model');
const n_Error = require('./Error');
const Layer = require('./Layer');
const { tanh, sigmoid } = require('./Activation');

const nnet = new Model(n_Error.meanSquaredError, 0.5);

nnet.addLayer(new Layer(2, sigmoid));
nnet.addLayer(new Layer(8, tanh));
nnet.addLayer(new Layer(1, sigmoid));


let training_data = [{
  inputs: [0, 0],
  outputs: [0]
},
{
  inputs: [0, 1],
  outputs: [1]
},
{
  inputs: [1, 0],
  outputs: [1]
},
{
  inputs: [1, 1],
  outputs: [0]
}
];


for (let i = 0; i < 1650; i++) {
  let random = training_data[Math.floor(Math.random() * training_data.length)];
  nnet.train(random.inputs, random.outputs);
}

nnet.predict([0, 0]).print();
nnet.predict([0, 1]).print();
nnet.predict([1, 1]).print();
nnet.predict([1, 0]).print();

