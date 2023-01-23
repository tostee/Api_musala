import { Module, forwardRef } from "@nestjs/common";
import { DeviceModule } from "src/device/device.module";
import { GatewayController } from "./gateway.controller";
import { GatewayService } from "./gateway.service";

@Module({
	imports: [forwardRef(() => DeviceModule)],
	exports: [GatewayService],
	controllers: [GatewayController],
	providers: [GatewayService],
})
export class GatewayModule {}
