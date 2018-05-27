export interface HealthCheck {
  Node: string;
  CheckID: string;
  Name: string;
  Status: string;
  Notes: string;
  Output: string;
  ServiceId: string;
  ServiceName: string;
  ServiceTags: string[];
  Definition?: any;
  CreateIndex: number;
  ModifyIndex: number;
}
