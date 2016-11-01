const extend = require('xtend');
require('toml-require').install();
const config = require('../../config.toml');
const oauth2Client = require('../oauth');

const setupState = (ctx, next) => {
    console.log('config middleware', ctx);
    const { message } = ctx.update;
    const admins = config.telegram.admins || [];
    if (!message) {
        return next();
    }
    const isAdmin = admins.includes(message.from.username);
    const loginUrl = oauth2Client.generateAuthUrl(
        { access_type: 'offline'
        , prompt: 'consent'
        , scope: config.oauth.scopes
        }
    );
    const nextState = extend(ctx.state,
        { isAdmin
        , loginUrl
        }
    );
    ctx.state = nextState; // eslint-disable-line
    return next();
};

module.exports = setupState;

