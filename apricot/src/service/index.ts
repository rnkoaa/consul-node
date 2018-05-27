import Consul from "consul";
import { ConsulOperations } from "./consul-operations";
import * as fs from "fs";
import * as path from "path";
import axios from "axios";
import { RoundRobinLoadBalancingStrategy } from "./round-robin-load-balancing-strategy";
import { DiscoveryClient } from "./discovery-client";
import { Url } from "../util/url";

import dotenv from "dotenv";

if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
} else {
  // logger.debug("Using .env.example file to supply config environment variables");
  // dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}

const consulOperations = new ConsulOperations();
const discoveryClient = new DiscoveryClient("random", consulOperations);
// async function run(instanceName) {
//   const banana = await discoveryClient.getServiceInstance(instanceName);
//   console.log(`${instanceName} => ${JSON.stringify(banana)}`);
//   console.log("==========================");
// }

// run("apricot");
// run("banana");
// run("banana");
// run("apricot");
// run("banana");
// run("apricot");

const bananaUrl = "http://banana/info";

async function generateUrl(url) {
  const urlPaths = Url.urlParts(url);
  let instanceHttpUrl;
  if (urlPaths.hostname) {
    const serviceInstance = await discoveryClient.getServiceInstance(urlPaths.hostname);
    instanceHttpUrl = `${urlPaths.protocol}://${serviceInstance.httpUri}${urlPaths.path}`;
    if (urlPaths.query_params) {
      instanceHttpUrl = `${instanceHttpUrl}${urlPaths.query_params}`;
    }
  }
  return instanceHttpUrl;
}

async function getHealth(url) {
  const generatedUrl = await generateUrl(url);
  return axios.get(generatedUrl);
}

getHealth(bananaUrl).then(response => {
  console.log(response.data);
});

// console.log(Url.urlParts(bananaUrl));

// import { ConsulServiceResponse } from "../domain/health-service-response";
// import { ServiceInstance } from "../domain/service-instance";

// const cert = fs.readFileSync(path.join(__dirname, "../certs/vagrant-hashi-stack.cert"), "utf8");
// const cacert = fs.readFileSync(path.join(__dirname, "../certs/cacert.pem"), "utf8");
// const caBuffer = [];
// console.log(cacert);
// caBuffer.push(cert.toString());
// caBuffer.push(cacert.toString());
// const consul = new Consul({
//   host: "vagrant-hashi-stack-1.alpha.consul",
//   port: "8501",
//   secure: false
// });

// const mService = "banana";
