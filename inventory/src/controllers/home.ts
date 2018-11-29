import { JsonController, Get } from "routing-controllers";

@JsonController()
export class HomeController {
  @Get("/")
  index() {
    return "Welcome Home.";
  }
}
