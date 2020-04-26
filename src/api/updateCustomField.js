const got = require("got");
const { prefixUrl } = require("./config");
const { parse } = require("../utils/requestHeader");

const update = async ({ request }, req) => {
  const header = await parse(req);
  const { source, target } = req.query;
  const url = prefixUrl + "/api/v3/requests/" + request.id;

  const params = `input_data={'request':{'udf_fields':{'${target}':'${
    request.udf_fields[source]
  }','${source}':'${""}'}}}`;

  try {
    await got
      .put(url, {
        headers: {
          Authorization: header.authKey,
          Accept: header.accept,
        },

        searchParams: params,
      })
      .json();
  } catch (error) {
    throw new Error("Couldn't update the request:" + error);
  }
};

module.exports = update;
