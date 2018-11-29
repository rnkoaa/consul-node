import express from "express";
import errorHandler from "errorhandler";
import { config } from "@hipster-store/config";
import { instanceOperations } from "@hipster-store/consul-discovery-service";

export class Server {
  _app: express.Application;
  constructor(_app: express.Application) {
    this._app = _app;
  }

  bootstrap(): void {
    /**
     * Error Handler. Provides full stack - remove for production
     */
    this._app.use(errorHandler());
    const server = this._app.listen(config.get("port"), () => {
      if (config.get("consul.register.self")) {
        instanceOperations.init();
      }
      console.log(
        "  App is running at http://localhost:%d in %s mode\n",
        config.get("port"),
        config.get("env")
      );
      console.log("Press CTRL-C to stop\n");
    });

    process.on("SIGTERM", () => {
      server.close(() => {
        console.log("closing all connections.");
        if (config.get("consul.register.self")) {
          instanceOperations.close(() => {
            console.log("Closed connections to consul. ON SIGTERM");
          });
        }
      });
    });

    process.on("SIGINT", () => {
      server.close(() => {
        console.log("closing all connections.");
        if (config.get("consul.register.self")) {
          instanceOperations.close(() => {
            console.log("Closed connections to consul. ON SIGTERM");
          });
        }
      });
    });
  }
}
