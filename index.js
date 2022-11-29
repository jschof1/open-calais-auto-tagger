const calais = require("opencalais-tagging");

const tagger = async (filePath, valuesToAnalyse, apiToken) => {
  let fileData = filePath;
  let descriptions = [];

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  let setLength = fileData.length >= 500 ? 500 : fileData.length;
  for (let i = 0; i < setLength; i++) {
    let description = fileData[i][valuesToAnalyse];
    descriptions.push(description);
  }
  let arr = [];
  let i = -1;

  for (const id of descriptions) {
    let arr2 = [];
    i += 1;
    try {
      const options = {
        content: id,
        accessToken: apiToken,
      };
      const allData = await calais.tag(options);
      delete allData.doc;

      let calaisResponse = Object.values(allData);
      const allNames = calaisResponse.filter((obj) => obj.name);

      for (let x of allNames) {
        if (
          x._type === "Person" ||
          x._type === "Company" ||
          x._type === "Organization" ||
          x._typeGroup === "socialTag" ||
          x._typeGroup === "topics"
        ) {
          arr2.push(x.name);
        }
      }
      arr.push({ [i]: arr2 });
    } catch (err) {
      arr.push({ [i]: ["NO VALUE PROVIDED OR RETURNED"] });
    }
    await delay(2000);
  }
  let tagsArr = arr
    .map((d) => Object.keys(d).map((key) => d[key]))
    .reduce((a, b) => a.concat(b), [])
    .map((d) => d.map((e) => e.replace(/_/g, " ")));

  let newFile = fileData.map((d, i) => {
    d["tags"] = tagsArr[i];
    return d;
  });
  return newFile;
};

module.exports = tagger;
