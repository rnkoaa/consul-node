import { HealthCheck } from "./health-check";
import { HealthNode } from "./health-node";
import { HealthService } from "./health-service";

export class ConsulServiceResponse {
  Checks: HealthCheck[];
  Service: HealthService;
  Node: HealthNode;

  static decode(json: any): ConsulServiceResponse {
    const consulHealthResponse = Object.create(ConsulServiceResponse.prototype);
    return Object.assign(consulHealthResponse, json);
  }
}
