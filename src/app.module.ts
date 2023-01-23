import { Module } from "@nestjs/common";

import { DeviceModule } from "./device/device.module";
import { GatewayModule } from "./gateway/gateway.module";

@Module({
	imports: [GatewayModule, DeviceModule],
})
export class AppModule {}
