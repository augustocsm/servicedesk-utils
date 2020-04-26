const accept = "application/vnd.manageengine.sdp.v3+json";

const parse = (req) => {
  return {
    authKey: req.headers.authorization,
    accept,
  };
};

module.exports = { parse };
