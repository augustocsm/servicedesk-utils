const got = require("got");
const { prefixUrl } = require("./config");
const { parse } = require("../utils/requestHeader");

const addRequestNote = async (req, note) => {
  const header = await parse(req);

  const { authKey, accept } = header;
  const url = prefixUrl + "/api/v3/requests/" + req.query.id + "/notes";

  const params = `input_data={"request_note":{"description":"${note}"}}`;

  try {
    const post = await got
      .post(url, {
        headers: {
          Authorization: authKey,
          Accept: accept,
        },
        searchParams: params,
      })
      .json();
  } catch (error) {
    console.log(error);
    throw new Error(`Couldn't add the note: ${error} `);
  }
};

module.exports = addRequestNote;
