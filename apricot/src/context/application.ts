import { ConsulOperations } from "../service/consul-operations";
import Consul from "consul";

export class Application {
  static consulOperations(): ConsulOperations {
    return new ConsulOperations();
  }

  static consulClient() {
    const isSecure = process.env.CONSUL_SECURE === "true";
    const consulOpts = {
      host: process.env.CONSUL_HOST,
      port: process.env.CONSUL_PORT,
      secure: isSecure
    };
    return new Consul(consulOpts);
  }
}
