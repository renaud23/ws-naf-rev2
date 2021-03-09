const fs = require("fs");

function loadFile() {
  return new Promise(function (resolve, reject) {
    fs.readFile("./naf-rev2.json", "utf8", function (err, data) {
      if (err) {
        reject(`Error reading file from disk: ${err}`);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

function createLevelMap(naf) {
  return Object.entries(naf).reduce(function (map, [code, rubrique]) {
    const { niveau } = rubrique;
    if (niveau in map) {
      return { ...map, [niveau]: [...map[niveau], rubrique] };
    }
    return { ...map, [niveau]: [rubrique] };
  }, {});
}

async function load(version) {
  const codes = await loadFile();
  const niveaux = createLevelMap(codes);
  return { niveaux, codes };
}

export default load;
