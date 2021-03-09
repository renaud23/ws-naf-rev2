const PARAM_LEVEL_NAMES = {
  section: "sections",
  division: "divisions",
  groupe: "groupes",
  classe: "classes",
  sousClasse: "sous-classes",
};

function getNiveauParamUrl(name) {
  return PARAM_LEVEL_NAMES[name];
}

export default getNiveauParamUrl;
