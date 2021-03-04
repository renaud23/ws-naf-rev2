function buildLink(rel, href) {
  return { rel, href, method: "GET" };
}

export default buildLink;
