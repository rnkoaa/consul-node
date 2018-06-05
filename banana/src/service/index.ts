import Consul from "consul";
import * as fs from "fs";
import * as path from "path";
import { ConsulServiceResponse } from "./health-service-response";
import { ServiceInstance } from "./service-instance";

const cert = fs.readFileSync(path.join(__dirname, "../certs/vagrant-hashi-stack.cert"), "utf8");
const cacert = fs.readFileSync(path.join(__dirname, "../certs/cacert.pem"), "utf8");
const caBuffer = [];
// console.log(cacert);
caBuffer.push(cert.toString());
caBuffer.push(cacert.toString());
const consul = new Consul({
  host: "vagrant-hashi-stack-1.alpha.consul",
  port: "8500",
  secure: false
});
// consul.health.service("vault", (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   const responses = result as ConsulServiceResponse[];
//   const service = responses[0].Service;
//   const serviceName = service.Service;
//   const checks = responses[0].Checks;
//   const passingServices = checks.filter(
//     check => check.Status === "passing" && check.ServiceName === serviceName
//   );
//   if (passingServices.length > 0) {
//     const serviceInstance = ServiceInstance.convert(service);
//   }
// });
// consul.health.service("consul", (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   const responses = result as ConsulServiceResponse[];
//   console.log(`Consul Length: ${responses.length}`);

//   const serviceInstances = responses.map(response => {
//     const mServices = [];
//     const service = response.Service;
//     const checks = response.Checks;
//     const passingServices = checks.filter(
//     //   check => check.Status === "passing" && check.ServiceName === service.Service
//       check => check.Status === "passing"
//     );

//     if (passingServices.length > 0) {
//       const serviceInstance = ServiceInstance.convert(service);
//       mServices.push(serviceInstance);
//     }
//     return mServices;
//   });

//   console.log(serviceInstances);
// });
