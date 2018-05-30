import { ConsulOperations } from "../service/consul-operations";
import Consul from "consul";

export class Application {
  static consulOperations(): ConsulOperations {
    return new ConsulOperations();
  }

  static consulClient(consulOpts) {
    //  const isSecure = process.env.CONSUL_SECURE === "true";
    return new Consul(consulOpts);
  }
}
