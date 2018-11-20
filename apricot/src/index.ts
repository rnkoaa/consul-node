import { InstanceOperations } from "@hipster-store/consul-discovery-service";

const instanceOperations = new InstanceOperations();

instanceOperations.init();

// setTimeout(() => {

// }, 60 * 1000);

setTimeout(function() {
    instanceOperations.close(() => {
        console.log("Instance Operations closed.");
    });
}, 60 * 1000);
