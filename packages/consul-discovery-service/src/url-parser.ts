import { RequestObject } from "./types/consul";
import { URL } from "url";

export class URLParser {
  parse(url: string): RequestObject {
    const parsedUrl = new URL(url);
    const { protocol, hostname } = parsedUrl;
    return <RequestObject>{
      protocol: protocol && protocol.startsWith("https:") ? "https" : "http",
      secure: protocol && protocol.startsWith("https:") ? true : false,
      service: hostname,
      path: this._generateUrlPath(parsedUrl)
    };
  }

  private _generateUrlPath = ({ pathname, search, hash }) => {
    let urlRemainder = "";
    if (pathname) {
      urlRemainder += pathname;
    }
    if (search) {
      urlRemainder += search;
    }
    if (hash) {
      urlRemainder += hash;
    }
    return urlRemainder;
  };
}
