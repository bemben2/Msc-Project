var config = {
    port: process.env.PORT || 3000,
    secrets: {
        jwt: process.env.JWT || 'pass'
      }
};

module.exports= config;
