const express = require("express");
const bodyParser = require("body-parser");
const tagger = require("./tagger");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/tagger", async (req, res) => {
  try {
    const { data, valueToAnalyse, apiToken } = req.body;
    const taggedData = await tagger(data, valueToAnalyse, apiToken);
    res.json(taggedData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});