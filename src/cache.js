import sizeof from "object-sizeof";

function createCache() {
  let totalSize = 0;
  const map = {};

  function get(path) {
    if (path in map) {
      const { response } = map[path];
      map[path].count++;
      return response;
    }

    return undefined;
  }

  function set(path, response) {
    if (!(path in map)) {
      const size = sizeof(response);
      totalSize += size;
      map[path] = { response, count: 1, size };
    }
  }

  return { get, set };
}

export default createCache;
