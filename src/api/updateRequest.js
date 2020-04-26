const got = require("got");
const { prefixUrl } = require("./config");
const { parse } = require("../utils/requestHeader");

const update = async (queryParams, req) => {
  const header = await parse(req);

  const url = prefixUrl + "/api/v3/requests/" + req.query.id;

  try {
    await got
      .put(url, {
        headers: {
          Authorization: header.authKey,
          Accept: header.accept,
        },
        searchParams: `${queryParams}`,
      })
      .json();
  } catch (error) {
    throw new Error(`"Couldn't update the request":${error}`);
  }
};

module.exports = update;
