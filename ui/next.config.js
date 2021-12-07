const securityHeaders = [];
module.exports = {
  async Headers() {
    return [
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];
  },
};
