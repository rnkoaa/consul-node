
export interface ConsulInstance {
  Name: string;
  ID: string;
  Address: string;
  Port: number;
}

export interface RequestObject {
  secure?: boolean,
  protocol?: string,
  service: string,
  path: string
}

export interface ConsulServiceHealthResponse {
  Node: ConsulNodeResponse;
  Service: ConsulServiceResponse;
  Checks: Array<ConsulNodeCheckResponse>;
}

export interface ConsulNodeCheckResponse {
  Node?: string;
  CheckID?: string;
  Name?: string;
  Status?: string;
  Notes?: string;
  Output?: string;
  ServiceId?: string;
  ServiceName?: string;
  ServiceTags?: Array<any>;
  Definition?: any;
  TTL?: string;
  CreateIndex?: number;
  ModifyIndex?: number;
  DeregisterCriticalServiceAfter?: string;
}

export interface ConsulNodeResponse {
  ID: string;
  Node: string;
  Address: string;
  Datacenter: string;
  TaggedAddresses?: TaggedAddresses;
  Meta?: any;
  CreateIndex: number;
  ModifyIndex: number;
}
export interface ConsulServiceResponse {
  ID: string;
  Service: string;
  Address: string;
  Port: number;
  Weights: any;
  EnableTagOverride: boolean;
  ProxyDestination?: string;
  Proxy?: any;
  Connect?: any;
  Tags?: Array<any>;
  TaggedAddresses?: TaggedAddresses;
  Meta?: any;
  CreateIndex: number;
  ModifyIndex: number;
}

export interface ConsulHealthCheck {
  ID?: string;
  Name?: string;
  Args?: string;
  Timeout?: string;
  DeregisterCriticalServiceAfter?: string;
  HTTP?: string;
  TCP?: string;
  TLSSkipVerify?: boolean;
  Method?: string;
  Interval?: string;
  Header?: string;
  GRPC?: string;
  ServiceId?: string;
  GRPCUseTLS?: string;
  DockerContainerID?: string;
  AliasService?: string;
  Shell?: string;
  Notes?: string;
  TTL?: string;
}
export interface Instance {
  address: string;
  executed: boolean;
  id: string;
  name: string;
  port: number;
  status: string;
}
export interface TaggedAddresses {
  lan: string;
  wan: string;
}
export interface NodeMeta {
  consulNetworkSegment: string;
}

export interface ServiceInstance {
  id: string;
  instanceId: string;
  serviceName: string;
  serviceAddress?: string;
  checkIndex?: number;
  modifyIndex?: number;
  createIndex?: number;
  secure: boolean;
  port: number;
  host: string;
}

export interface ServiceRegistrationRequest {
  Name: string;
  Address: string;
  Port: number;
  Check?: ConsulHealthCheck;
  Checks?: Array<ConsulHealthCheck>;
  Meta?: any;
  EnableTagOverride?: boolean;
}