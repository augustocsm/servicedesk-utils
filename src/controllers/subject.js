const getRequest = require("../api/getRequest");
const updateRequest = require("../api/updateRequest");

const product = "udf_char2";
const domain = "udf_char1";

const optimizeSubject = async (req, res) => {
  const { request } = await getRequest(req);

  validate(request);

  const query = buildQuery(buildSubject(request));

  try {
    updateRequest(query, req);

    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
};

const validate = (request) => {
  const field = request.udf_fields;

  if (!field[product].length || !field[domain].length) {
    throw new Error("SDP fields must contain values");
  }

  return true;
};

const buildQuery = (newSubject) => {
  const queryParams = `input_data={"request":{"subject":"${newSubject}"}}`;

  return queryParams;
};

const buildSubject = ({ subject, udf_fields }) => {
  const newSubject =
    `${clear(subject)}` +
    ` [${udf_fields[domain]}]` +
    ` [${udf_fields[product]}].`;

  return newSubject;
};

const clear = (subject) => {
  if (subject.indexOf(" [") >= 0 || subject.indexOf("[") >= 0) {
    const pureSubject = subject.substring(0, subject.indexOf(" ["));

    return pureSubject;
  }
  return subject;
};

module.exports = optimizeSubject;
