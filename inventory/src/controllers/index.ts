import { HomeController } from "./home";

import { SkuController } from "./sku";

import { InfoController } from "./info";

import { HealthController } from "./health";

export { HealthController } from "./health";
export { SkuController } from "./sku";
export { HomeController } from "./home";
export { InfoController } from "./info";

export const APPLICATION_CONTROLLERS = [
  HomeController,
  SkuController,
  InfoController,
  HealthController
];
