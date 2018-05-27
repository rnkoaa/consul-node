export class Url {
  static urlParts(url: string): any {
    const results = {};
    const match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i);
    if (match != undefined && match.length > 2 && typeof match[2] === "string" && match[2].length > 0) {
      //   return match[2];
      results["protocol"] = match[2]; // protocol
      results["hostname"] = match[4]; // domain or hostname
      results["path"] = match[5]; // remaining paths
      if (match[6]) {
        results["query_params"] = match[6]; // any search query
      }
    } else {
      return undefined;
    }
    return results;
  }

  static getPath(url: string): string {
    const hostName = Url.getHostName(url);
    if (hostName) {
      console.log(`Length of hostname: ${hostName.length}`);
      console.log(`Hostname starts at ${url.indexOf(hostName)}`);
      const urlPrefixIndex = url.indexOf(hostName) + hostName.length;
      return url.substr(urlPrefixIndex, url.length - 1);
    }
    return undefined;
  }

  static getHostName(url): string {
    const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != undefined && match.length > 2 && typeof match[2] === "string" && match[2].length > 0) {
      return match[2];
    } else {
      return undefined;
    }
  }

  static getDomain(url) {
    const hostName = Url.getHostName(url);
    let domain = hostName;
    if (hostName != undefined) {
      const parts = hostName.split(".").reverse();

      if (parts != undefined && parts.length > 1) {
        domain = parts[1] + "." + parts[0];

        if (hostName.toLowerCase().indexOf(".co.uk") != -1 && parts.length > 2) {
          domain = parts[2] + "." + domain;
        }
      }
    }

    return domain;
  }
}
