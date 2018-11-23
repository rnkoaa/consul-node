import { ConsulInstanceConfig } from "./consul-instance-config";

export class ConsulRegistrationService {
    _consulInstanceConfig: ConsulInstanceConfig;

    constructor(_consulInstanceConfig: ConsulInstanceConfig) {
        this._consulInstanceConfig = _consulInstanceConfig;
    }

    get serviceName(): string {
        return this._consulInstanceConfig.serviceName;
    }

    get instanceId(): string {
        return this._consulInstanceConfig.instanceId || "";
    }
    set instanceId(_instanceId: string) {
        this._consulInstanceConfig.instanceId = _instanceId;
    }

    get serviceAddress(): string {
        return this._consulInstanceConfig.serviceAddress || "localhost";
    }

    get servicePort(): number {
        return this._consulInstanceConfig.servicePort || 3000;
    }

    get address(): string {
        return this._consulInstanceConfig.host || "localhost";
    }
    get port(): number {
        return this._consulInstanceConfig.port || 8500;
    }
    get enableHealthCheck(): boolean {
        return this._consulInstanceConfig.enableHealthCheck || false;
    }

    get registrationUrl(): string {
        const secure = this._consulInstanceConfig.secure || false;
        let requestUrl = "";
        requestUrl += (secure) ? "https://" : "http://";
        requestUrl += `${this.address}:${this.port}/v1/agent/service/register`;
        return requestUrl
    }
    
    get deRegistrationUrl(): string {
        const secure = this._consulInstanceConfig.secure || false;
        let requestUrl = "";
        requestUrl += (secure) ? "https://" : "http://";
        requestUrl += `${this.address}:${this.port}/v1/agent/service/deregister/${this.instanceId}`;
        return requestUrl
    }



}