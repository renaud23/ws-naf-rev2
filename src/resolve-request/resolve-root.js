import {
  NIVEAUX,
  buildHypermediaLink,
  buildLink,
  getNiveauParamUrl,
} from "./commons";

const describe =
  "La NAF, nomenclature d'activités française, est une nomenclature des activités économiques productives, principalement élaborée pour faciliter l'organisation de l'information économique et sociale. Afin de faciliter les comparaisons internationales, elle a la même structure que la nomenclature d'activités européenne NACE, elle-même dérivée de la nomenclature internationale CITI.";

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
