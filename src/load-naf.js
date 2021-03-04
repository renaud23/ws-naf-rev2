const fs = require("fs");

const describe =
  "La NAF, nomenclature d'activités française, est une nomenclature des activités économiques productives, principalement élaborée pour faciliter l'organisation de l'information économique et sociale. Afin de faciliter les comparaisons internationales, elle a la même structure que la nomenclature d'activités européenne NACE, elle-même dérivée de la nomenclature internationale CITI.";

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

function buildLink(rel, href) {
  return { rel, href, method: "GET" };
}

function createLinks(rubriques, version) {
  return rubriques.map(function ({ code, niveau }) {
    return buildLink(niveau, `/${version}/naf-rev2/${niveau}/${code}`);
  });
}

function makeRoot(naf, version) {
  return {
    version: "rev2",
    describe,
    links: [
      buildLink("sections", `/${version}/naf-rev2/sections`),
      buildLink("divisions", `/${version}/naf-rev2/divisions`),
      buildLink("groupes", `/${version}/naf-rev2/groupes`),
      buildLink("classes", `/${version}/naf-rev2/classes`),
      buildLink("sous-classes", `/${version}/naf-rev2/sous-classes`),
    ],
  };
}

function createRubriques(rubriques, parent, describe, version) {
  return {
    version: "rev2",
    describe,
    count: rubriques.length,
    parent: parent,
    links: [...createLinks(rubriques, version)],
  };
}

function createPath(naf, version) {
  const path = {};
  path[`/${version}/naf-rev2`] = makeRoot(naf, version);
  path[`/${version}/naf-rev2/sections`] = createRubriques(
    naf.sections,
    buildLink("naf-rev2", `/${version}/naf-rev2`),
    "sections",
    version
  );
  path[`/${version}/naf-rev2/divisions`] = createRubriques(
    naf.divisions,
    buildLink("sections", `/${version}/naf-rev2/sections`),
    "sections",
    version
  );
  path[`/${version}/naf-rev2/groupes`] = createRubriques(
    naf.groupes,
    buildLink("divisions", `/${version}/naf-rev2/divisions`),
    "groupes",
    version
  );
  path[`/${version}/naf-rev2/classes`] = createRubriques(
    naf.classes,
    buildLink("groupes", `/${version}/naf-rev2/groupes`),
    "classes",
    version
  );
  path[`/${version}/naf-rev2/sous-classes`] = createRubriques(
    naf.sousClasses,
    buildLink("classes", `/${version}/naf-rev2/classes`),
    "sous-classes",
    version
  );

  return path;
}

function createRubriqueLink(rubrique, version) {
  const { niveau, code } = rubrique;
  return buildLink(niveau, `/${version}/naf-rev2/${niveau}/${code}`);
}

function findPath(naf, niveau, code, version) {
  if (code in naf) {
    const { libelle, parent, children } = naf[code];
    let childrenLinks,
      parentLink = `/${version}/naf-rev2`;
    if (children) {
      childrenLinks = children.map((c) => createRubriqueLink(naf[c], version));
    }
    if (parent) {
      parentLink = createRubriqueLink(naf[parent], version);
    }
    return {
      libelle,
      code,
      niveau,
      children: { count: childrenLinks.length, links: childrenLinks },
      parent: parentLink ? { links: [parentLink] } : undefined,
    };
  }
  return undefined;
}

async function load(version) {
  const naf = await loadFile();
  const levelMap = createLevelMap(naf);
  const pathMap = createPath(levelMap, version);

  return function (path, niveau, code) {
    if (path in pathMap) {
      return pathMap[path];
    } else {
      const response = findPath(naf, niveau, code, version);
      if (response) {
        pathMap[path] = response;
        return response;
      }
    }
    return undefined;
  };
}

export default load;
