const path = require('path');

const env = {
    db:'mongodb://localhost/warehouse',
    root:path.join(__dirname, '..')

};


module.exports = env;
