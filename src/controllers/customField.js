const getRequest = require("../api/getRequest");
const updateFields = require("../api/updateCustomField");
const addRequestNote = require("../api/addRequestNote");

const moveValue = async (req, res) => {
  validate(req, res);

  try {
    const doc = await getRequest(req);

    await updateFields(doc, req);

    insertNoteIn(doc.request.udf_fields, req);

    res.send({ status: "The field value was moved." });
  } catch (e) {
    res.status(500).send(e);
  }
};

const insertNoteIn = async (udf_fields, req) => {
  const { source, target } = req.query;

  const note = composeNote(udf_fields[source], udf_fields[target]);

  if (note.length) {
    await addRequestNote(req, note);
  }
};

const composeNote = (srcField, targetField) => {
  if (targetField === "null" || !targetField) {
    return composeSourceMsg(srcField);
  }

  if (srcField === "null" || !srcField) {
    return "";
  }

  return newSrcMsg(srcField) + " <br /><br /> " + newTargetMsg(targetField);
};

const newSrcMsg = (value) => {
  return encodeURIComponent(`Status atual: ${value}`);
};

const newTargetMsg = (value) => {
  return encodeURIComponent(`Anterior:  ${value}`);
};

const validate = (req, res) => {
  const error = [];

  const { source, target, id } = req.query;

  if (!req.headers.authorization) {
    error.push("Authorization needed in headers");
  } else if (!source) {
    error.push("Missing param source (value ex: udf_char0)");
  } else if (!target) {
    error.push("Missing param target (value ex: udf_char10)");
  } else if (!id) {
    error.push("Missing param request id");
  }

  if (error.length) {
    res.status(400).send(validate(req));
  }
};

module.exports = { moveValue };
