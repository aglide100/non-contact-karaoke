const headers = require('./headers');

module.exports = {
  async Headers() {
    return [
      {
        source: "/.*",
        headers,
      },
    ];
  },
};
