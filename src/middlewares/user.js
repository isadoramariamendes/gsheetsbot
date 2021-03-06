const extend = require('xtend');

// This middleware extracts information
// from a received data, such as user display name
// and writes it to the ctx.state to be used by other middlewares
//
// Currently it will set:
// - displayName: first_name + ' ' + last_name if set or username
// - userId: the telegram id from the message author
// - timestamp: the date of the update
const messageDataParser = (ctx, next) => {
    const { message } = ctx.update;
    if (!message) {
        return next();
    }
    const { text, date } = message;
    const { first_name, last_name, username, id } = ctx.from;
    const displayName = [first_name, last_name] //eslint-disable-line
        .filter(name => name !== undefined)
        .join(' ') || username;
    const nextState = extend(ctx.state,
        { displayName
        , text
        , userId: `${id}`
        , timestamp: date
        }
    );
    ctx.state = nextState; // eslint-disable-line
    return next();
};

module.exports = messageDataParser;

