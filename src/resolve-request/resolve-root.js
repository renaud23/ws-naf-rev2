import { NIVEAUX, buildHypermediaLink, buildLink } from "./commons";

const describe =
  "La NAF, nomenclature d'activités française, est une nomenclature des activités économiques productives, principalement élaborée pour faciliter l'organisation de l'information économique et sociale. Afin de faciliter les comparaisons internationales, elle a la même structure que la nomenclature d'activités européenne NACE, elle-même dérivée de la nomenclature internationale CITI.";

const NIVEAUX_URL = {
  section: "sections",
  division: "divisions",
  groupe: "groupes",
  classe: "classes",
  sousClasse: "sous-classes",
};

function getNiveauParamUrl(name) {
  return NIVEAUX_URL[name];
}

function resolve(request, naf, version) {
  const relationships = Object.keys(NIVEAUX).reduce(function (a, name) {
    const paramUrl = getNiveauParamUrl(name);
    return {
      ...a,
      [paramUrl]: buildHypermediaLink(buildLink(paramUrl, version)),
    };
  }, {});
  return {
    revision: "rev2",
    describe,
    links: {
      self: buildHypermediaLink(buildLink("", version)),
      ...relationships,
    },
  };
}

export default resolve;
