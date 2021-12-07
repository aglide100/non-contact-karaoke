const securityHeaders = [];
module.exports = {
  async Headers() {
    return [
      {
        key: "Permissions-Policy",
        value:
          "camera=(none), microphone=(none), geolocation=(none), interest-cohort=(none)",
      },
    ];
  },
};
