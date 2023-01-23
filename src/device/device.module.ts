import { Module, forwardRef } from "@nestjs/common";
import { GatewayModule } from "src/gateway/gateway.module";
import { DeviceController } from "./device.controller";
import { DeviceService } from "./device.service";

@Module({
	imports: [forwardRef(() => GatewayModule)],
	exports: [DeviceService],
	controllers: [DeviceController],
	providers: [DeviceService],
})
export class DeviceModule {}
