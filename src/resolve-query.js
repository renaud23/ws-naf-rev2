import NAF_NIVEAUX, { STRUCTURE_NIVEAUX } from "./naf-niveaux";
import createRubriques from "./create-rubriques";

const QUERY_PARAMS = {
  section: "section",
  division: "division",
  groupe: "groupe",
  classe: "classe",
};

// const QUERY_RESPONSE = {
//   division: function ({ path, query, niveau, code }, value) {},
// };

function isValidParam(param) {
  return param && param in QUERY_PARAMS;
}

function isParamCompatible(param, niveau) {
  if (STRUCTURE_NIVEAUX[niveau].parent === `${param}s`) {
    return true;
  }

  return false;
}

function isIn(rubrique, codes) {
  const { code } = rubrique;
  return codes.indexOf(code) !== -1;
}

function resolve(path, query, niveau, code, levelMap, naf, version) {
  if (code || Object.keys(query).length > 1) {
    return undefined;
  }
  const [param, value] = Object.entries(query)[0];
  if (!isValidParam(param)) {
    return undefined;
  }
  if (!isParamCompatible(param, niveau)) {
    return undefined;
  }
  const parentName = STRUCTURE_NIVEAUX[niveau].parent;
  const parent = levelMap[parentName].find(function ({ code: cp }) {
    return cp === value;
  });
  if (parent) {
    const { children } = parent;
    const rubriques = children.map(function (code) {
      return naf[code];
    });
    return createRubriques(rubriques, undefined, niveau, version);
  }

  return undefined;
}

export default resolve;
