const securityHeaders = [];
module.exports = {
  async Headers() {
    return [
      {
        src: "/.*",
        headers: {
          "Permissions-Policy": "none",
        },
      },
    ];
  },
};
