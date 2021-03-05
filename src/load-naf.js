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

// function makeRoot(naf, version) {
//   const links = Object.keys(NIVEAUX).map(function (name) {
//     return buildLink(name, `/${version}/naf-rev2/${name}`);
//   });
//   return {
//     version: "rev2",
//     describe,
//     links,
//   };
// }

// function createPath(naf, version) {
//   const path = {};
//   path[`/${version}/naf-rev2`] = makeRoot(naf, version);
//   path[`/${version}/naf-rev2/sections`] = createRubriques(
//     naf.sections,
//     buildLink("naf-rev2", `/${version}/naf-rev2`),
//     "sections",
//     version
//   );
//   path[`/${version}/naf-rev2/divisions`] = createRubriques(
//     naf.divisions,
//     buildLink("sections", `/${version}/naf-rev2/sections`),
//     "divisions",
//     version
//   );
//   path[`/${version}/naf-rev2/groupes`] = createRubriques(
//     naf.groupes,
//     buildLink("divisions", `/${version}/naf-rev2/divisions`),
//     "groupes",
//     version
//   );
//   path[`/${version}/naf-rev2/classes`] = createRubriques(
//     naf.classes,
//     buildLink("groupes", `/${version}/naf-rev2/groupes`),
//     "classes",
//     version
//   );
//   path[`/${version}/naf-rev2/sous-classes`] = createRubriques(
//     naf.sousClasses,
//     buildLink("classes", `/${version}/naf-rev2/classes`),
//     "sous-classes",
//     version
//   );

//   return path;
// }

// function createRubriqueLink(rubrique, version) {
//   const { niveau, code } = rubrique;
//   return buildLink(niveau, `/${version}/naf-rev2/${niveau}/${code}`);
// }

// function findPath(naf, niveau, code, version) {
//   if (code in naf) {
//     const { libelle, parent, children } = naf[code];
//     let childrenLinks,
//       parentLink = `/${version}/naf-rev2`;
//     if (children) {
//       childrenLinks = children.map((c) => createRubriqueLink(naf[c], version));
//     }
//     if (parent) {
//       parentLink = createRubriqueLink(naf[parent], version);
//     }
//     return {
//       libelle,
//       code,
//       niveau,
//       children: { count: childrenLinks.length, links: childrenLinks },
//       parent: parentLink ? { links: [parentLink] } : undefined,
//     };
//   }
//   return undefined;
// }

// function isQueryEmpty(query) {
//   return Object.keys(query).length === 0;
// }

async function load(version) {
  const codes = await loadFile();
  const niveaux = createLevelMap(codes);

  return { niveaux, codes };
}

export default load;
