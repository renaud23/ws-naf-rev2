function build(path, version) {
  if (path.startsWith("/")) {
    return `/${version}/naf-rev2${path}`;
  }
  return `/${version}/naf-rev2/${path}`;
}

export default build;
