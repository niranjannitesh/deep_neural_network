const Matrix = require('./Matrix');

class n_Error {

    /**
     *
     * @param {Matrix} target
     * @param {Matrix} prediction
     */
    static meanSquaredError(target, prediction) {
        return target.subtract(prediction);
    }

}


module.exports = n_Error;
