# Deep Neural Network

A simple Deep Neural Network Library (Not Optimized but gets simple works done).

## TODO

- [ ] Add Adam
- [ ] Add ReLU
- [ ] MNIST Example
- [ ] Model Saving and Restoring

## Example

``` javascript
const nnet = new Model(n_Error.meanSquaredError, 0.2);

nnet.addLayer(new Layer(2, sigmoid));
nnet.addLayer(new Layer(8, sigmoid));
nnet.addLayer(new Layer(1, sigmoid));

nnet.train([inputs], [outputs]);

nnet.predict(input).print();
```

## npm installation
``` npm install nnet ```

## License
This project is licensed under the terms of the MIT license,see LICENSE.
