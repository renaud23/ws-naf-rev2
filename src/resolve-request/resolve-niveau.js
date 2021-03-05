import { buildRubrique, buildRubriqueSelf } from "./commons";

// page, size

function isPageRequest(query) {
  if ("page" in query && "size" in query) {
    const { page, size } = query;
    if (!isNaN(parseInt(page, 10)) && !isNaN(parseInt(size, 10))) {
      return true;
    }
  }
  return false;
}

function convertPageParam(query) {
  const { page, size } = query;
  return { page: parseInt(page, 10), size: parseInt(size, 10) };
}

/* */

function withPagination(request, naf, version) {
  const { params, query } = request;
  const { niveau } = params;
  const { niveaux } = naf;
  const rubriques = niveaux[niveau];
  const max = rubriques.length;
  const { size, page } = convertPageParam(query);
  const start = Math.min(size * (page - 1), Math.ceil(max / size));
  const length = Math.min(size, max - start);

  if (length) {
    const sub = rubriques.slice(start, start + length).map(function (rubrique) {
      return buildRubrique(rubrique, naf, version);
    });

    return { [niveau]: sub, links: {} };
  }

  return undefined;
}

function withoutPagination(request, naf, version) {
  const { params } = request;
  const { niveau } = params;
  const { niveaux } = naf;
  const rubriques = niveaux[niveau];
  const links = rubriques.map(function (rubrique) {
    return buildRubriqueSelf(rubrique, version);
  });
  return {
    describe: niveau,
    count: rubriques.length,
    links: { [niveau]: links },
  };
}

function resolve(request, naf, version) {
  const { query } = request;
  if (isPageRequest(query)) {
    return withPagination(request, naf, version);
  }
  return withoutPagination(request, naf, version);
}

export default resolve;
