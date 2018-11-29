import { Get, JsonController } from "routing-controllers";

@JsonController()
export class HealthController {
  @Get("/health")
  appHealth() {
    console.log(`${new Date()} => Got Request.`);
    return { status: "UP" };
  }
}
