const cors = require('cors');

module.exports = (app) => {
  app.use(cors({ origin: 'https://browser.blockstack.org', optionsSuccessStatus: 200 }));
}