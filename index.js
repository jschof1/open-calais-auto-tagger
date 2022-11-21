const calais = require("opencalais-tagging");
const fs = require("fs");

const tagger = async (filePath, valuesToAnalyse, apiToken) => {
  let file = await fs.readFileSync(filePath, "utf8");
  let fileData = JSON.parse(file);
  let descriptions = [];

  for (let i = 0; i < fileData.length; i++) {
    let description = fileData[i][valuesToAnalyse];
    descriptions.push(description);
  }

  let arr = [];
  let i = -1;

  const interval = setInterval(async () => {
    let arr2 = [];
    i += 1;

    let lengthCheck = recNums.length >= 500 ? 500 : recNums.length;
    // choose how many requests you want to make - REMEMBER you are limited to 500 per day
    if (i === lengthCheck) {
      // mutate file with new data
      let tagsArr = arr
        .map((d) => Object.keys(d).map((key) => d[key]))
        .reduce((a, b) => a.concat(b), [])
        .map((d) => d.map((e) => e.replace(/_/g, " ")));

      let newFile = fileData.map((d, i) => {
        d["tags"] = tagsArr[i];
        return d;
      });
      fs.writeFileSync(filePath, JSON.stringify(newFile));
      clearInterval(interval);
    }
    try {
      const options = {
        content: descriptions[i],
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
      return arr.push({ [i]: arr2 });
    } catch (err) {
      return arr.push({ [i]: ["NO VALUE PROVIDED OR RETURNED"] });
    }
  }, 2000);
};

