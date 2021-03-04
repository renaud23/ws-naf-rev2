import buildLink from "./build-link";

function createLinks(rubriques, version) {
  return rubriques.map(function ({ code, niveau }) {
    return buildLink(niveau, `/${version}/naf-rev2/${niveau}/${code}`);
  });
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

export default createRubriques;
