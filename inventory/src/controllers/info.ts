import { Get, JsonController } from "routing-controllers";
import { config } from "@hipster-store/config";
import path from "path";
import fs from "fs";

@JsonController()
export class InfoController {
  @Get("/info")
  appHealth() {
    console.log(`${new Date()} => Got Request.`);
    // console.log(this.getEnv());
    return config.getProperties();
  }

  getEnv() {
    const processRoot = process.cwd();
    const pkgJsonFile = path.join(processRoot, "package.json");
    const pkgFile = fs.readFileSync(pkgJsonFile, "utf-8");
    // console.log(pkgFile)

    const jsonFile = JSON.parse(pkgFile);
    console.log(`Version: ${jsonFile.version}`);
    console.log(`Version: ${jsonFile.name}`);
  }
}
