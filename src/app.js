const express = require("express");
const { moveValue } = require("./controllers/customField");
const optimizesubject = require("./controllers/subject");

const app = express();

const port = process.env.PORT || 3001;

app.post("/rlc/movefieldvalue", moveValue);

app.post("/maintenance/optimizesubject", optimizesubject);

app.get("*", (req, res) => {
  try {
    res.send("Ready for action!");
  } catch (error) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
