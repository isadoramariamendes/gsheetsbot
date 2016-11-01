const google = require('googleapis');

require('toml-require').install();
const config = require('../config.toml');
const oauth2Client = require('./oauth');

oauth2Client.setCredentials(
    { refresh_token: config.oauth.refreshToken
    , expiry_date: true
    }
);

const gsheets = google.sheets('v4');
const pattern = new RegExp('.*/d/([^/]*).*');
const spreadsheetId = config.sheet.url.replace(pattern, '$1');

console.log('spreadsheetId', spreadsheetId);

const params =
    { auth: oauth2Client
    , spreadsheetId
    , range: config.sheet.inputRange
    };
gsheets.spreadsheets.values.get(params, (err, response) => {
    if (err) {
        console.error(err);
        return err;
    }
    console.log('success', response);
    console.log(response.values);
    return response;
});
