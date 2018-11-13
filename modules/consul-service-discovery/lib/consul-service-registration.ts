import { ConsulInstanceConfig } from "./consul-instance-config";

export class ConsulRegistrationService {
    _consulInstanceConfig: ConsulInstanceConfig;

    constructor(_consulInstanceConfig: ConsulInstanceConfig) {
        this._consulInstanceConfig = _consulInstanceConfig;

    }

    get name(): string {
        return this._consulInstanceConfig.applicationName;
    }

    get serviceId(): string {
        return this._consulInstanceConfig.serviceId || "";
    }

    set serviceId(_serviceId: string) {
        this.serviceId = _serviceId;
    }
    get address(): string {
        return this._consulInstanceConfig.host || "localhost";
    }
    get port(): number {
        return this._consulInstanceConfig.port || 8500;
    }

    get registrationUrl(): string {
        const secure = this._consulInstanceConfig.secure || false;
        let requestUrl = "";
        requestUrl += (secure) ? "https://" : "http://";
        requestUrl += `${this.address}:${this.port}/v1/agent/service/register`;
        return requestUrl
    }



}