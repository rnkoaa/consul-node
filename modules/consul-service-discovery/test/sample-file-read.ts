// import * as fs from "fs";
// import * as path from "path";
// import { ConsulServiceHealthResponse } from "../lib/types/consul-instance";

// fs.readFile(path.join(__dirname, "./consul-health-service-response.json"), "utf-8", (err, data) => {
//     if (err) {
//         throw err;
//     }

//     const jsonData = JSON.parse(data);
//     const consulServiceHealthResponses = <Array<ConsulServiceHealthResponse>>jsonData;
//     // console.log(jsonData[0].Checks)
//     // console.log(jsonData[0].Node)
//     // console.log(jsonData[0].Service)

//     console.log(consulServiceHealthResponses[0].Checks);
// })