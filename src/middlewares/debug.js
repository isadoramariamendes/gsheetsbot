const util = require('util');
const debug = (ctx, next) => {
    console.log('[DEBUG] update =\n', util.inspect(ctx.update));
    console.log('[DEBUG] update =\n', JSON.stringify(ctx.update));
    return next();
};

module.exports = debug;
