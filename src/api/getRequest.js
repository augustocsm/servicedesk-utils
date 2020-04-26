const got = require("got");
const { prefixUrl } = require("./config");
const { parse } = require("../utils/requestHeader");

const get = async (req) => {
  const header = await parse(req);

  const url = prefixUrl + "/api/v3/requests/" + req.query.id;
  try {
    const request = await got(url, {
      headers: {
        Authorization: header.authKey,
      },
    }).json();

    return request;
  } catch (error) {
    throw new Error("Couldn't get the request: " + error);
  }
};

module.exports = get;
