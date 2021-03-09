import { buildRubrique } from "./commons";

function resolve(request, naf, version) {
  const { params } = request;
  const { code } = params;
  const { codes } = naf;
  if (code in codes) {
    const rubrique = codes[code];
    return buildRubrique(rubrique, naf, version);
  }
  return undefined;
}

export default resolve;
