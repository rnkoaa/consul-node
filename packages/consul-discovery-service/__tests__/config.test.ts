import { generateHTTPHealthCheck } from "../lib/config";
import { ConsulHealthCheck } from "../lib/types/consul";
import {datastoreInstance} from '../src/index'
describe("Config can be generated easily from env files.", () => {
    // test("expect that 1 + 1 = 2", () => {
    //     expect(1+1).toEqual(2)
    // })

    const OLD_ENV = process.env;

    beforeEach(() => {
        datastoreInstance.clear();
        jest.resetModules() // this is important
        process.env = { ...OLD_ENV };
        delete process.env.NODE_ENV;
        process.env = Object.assign(process.env, { CUSTOM_VAR: 'value' });
    });

    afterEach(() => {
        process.env = OLD_ENV;
        datastoreInstance.clear();
    });

    test('will receive process.env variables', () => {
        // set the variables
        process.env.NODE_ENV = 'dev';
        process.env.CONSUL_HTTP_HEALTH_CHECK = "true"
        process.env.CONSUL_HTTP_HEALTH_CHECK_ADDRESS = "http://localhost:3000/health"
        process.env.CONSUL_HTTP_HEALTH_CHECK_PATH = "/health"
        process.env.CONSUL_HTTP_HEALTH_CHECK_INTERVAL = "10s"
        process.env.CONSUL_HTTP_HEALTH_CHECK_TIMEOUT = "1s"
        process.env.CONSUL_HTTP_HEALTH_CHECK_NAME = "HTTP API on port 5000"
        process.env.CONSUL_HTTP_HEALTH_CHECK_TLS_SKIP_VERIFY = "false"
        process.env.CONSUL_HTTP_HEALTH_CHECK_METHOD = "GET"
        process.env.APPLICATION_SECURE = 'false'
        process.env.APPLICATION_HOST = "localhost"
        process.env.APPLICATION_PORT = "3000"

        const healthCheck: ConsulHealthCheck = generateHTTPHealthCheck(process.env);
        expect(healthCheck).not.toBeUndefined;
        expect(healthCheck.HTTP).not.toBeUndefined;
        expect(healthCheck.HTTP).toEqual('http://localhost:3000/health');

        expect(healthCheck.Method).not.toBeUndefined
        expect(healthCheck.Method).toEqual('GET')

    });
    test('When the check address is not supplied, the application can generate health endpoint', () => {
        // set the variables
        process.env.NODE_ENV = 'dev';
        process.env.CONSUL_HTTP_HEALTH_CHECK = "true"
        process.env.CONSUL_HTTP_HEALTH_CHECK_PATH = "/health"
        process.env.CONSUL_HTTP_HEALTH_CHECK_INTERVAL = "10s"
        process.env.CONSUL_HTTP_HEALTH_CHECK_TIMEOUT = "1s"
        process.env.CONSUL_HTTP_HEALTH_CHECK_NAME = "HTTP API on port 5000"
        process.env.CONSUL_HTTP_HEALTH_CHECK_TLS_SKIP_VERIFY = "false"
        // process.env.CONSUL_HTTP_HEALTH_CHECK_METHOD = "GET"
        process.env.APPLICATION_SECURE = 'false'
        process.env.ADVERTISE_HOST = "localhost"
        process.env.ADVERTISE_PORT = "5000"

        const healthCheck: ConsulHealthCheck = generateHTTPHealthCheck(process.env);
        expect(healthCheck).not.toBeUndefined;
        expect(healthCheck.HTTP).not.toBeUndefined;
        expect(healthCheck.HTTP).toEqual('http://localhost:5000/health');

        expect(healthCheck.Method).not.toBeUndefined
    });
})