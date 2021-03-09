import resolveNiveau from "./resolve-niveau";
import resolveRoot from "./resolve-root";
import resolveRubrique from "./resolve-rubrique";

function resolve(request, naf, version) {
  const { params } = request;
  const { niveau, code } = params;

  if (code === undefined && niveau === undefined) {
    return resolveRoot(request, naf, version);
  }
  if (code === undefined && niveau !== undefined) {
    return resolveNiveau(request, naf, version);
  }
  if (code !== undefined && niveau !== undefined) {
    return resolveRubrique(request, naf, version);
  }
  return undefined;
}

export default resolve;
