import buildHypermediaLink from "./build-hypermedia-link";
import buildLink from "./build-link";

function appendChildren(response, children, naf, version) {
  if (children) {
    const { codes } = naf;
    const { links } = response;
    let niv;
    const hypermedia = children.map(function (code) {
      const { niveau } = codes[code];
      niv = niveau;
      return buildHypermediaLink(buildLink(`/${niveau}/${code}`, version));
    });
    return { ...response, links: { ...links, [niv]: hypermedia } };
  }
  return response;
}

function appendParent(response, parent, naf, version) {
  if (parent) {
    const { codes } = naf;
    const { links } = response;
    const { niveau } = codes[parent];
    const hypermedia = buildHypermediaLink(
      buildLink(`/${niveau}/${parent}`, version)
    );
    return { ...response, links: { ...links, [niveau]: hypermedia } };
  }
  return response;
}

export function buildRubriqueSelf(rubrique, version) {
  const { code, niveau } = rubrique;
  return {
    self: buildHypermediaLink(buildLink(`/${niveau}/${code}`, version)),
  };
}

export function buildRubrique(rubrique, naf, version) {
  const { code, libelle, niveau, children, parent } = rubrique;

  const response = {
    code,
    libelle,
    niveau,
    links: buildRubriqueSelf(rubrique, version),
  };

  return appendParent(
    appendChildren(response, children, naf, version),
    parent,
    naf,
    version
  );
}
