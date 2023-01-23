import {
	Controller,
	Get,
	Inject,
	Param,
	Query,
	UseGuards,
	forwardRef,
} from "@nestjs/common";
import { BasicAuthGuard } from "src/auth.guard";
import { GatewayService } from "src/gateway/gateway.service";
import { DeviceService } from "./device.service";

@Controller("devices")
@UseGuards(BasicAuthGuard)
export class DeviceController {
	constructor(
		private readonly deviceSrv: DeviceService,
		@Inject(forwardRef(() => GatewayService))
		private readonly gatewaySrv: GatewayService,
	) {}

	@Get()
	getList() {
		return this.deviceSrv.findAll();
	}

	@Get(":id")
	async getById(
		@Param("id") id: string,
		@Query("populate") populate: boolean = false,
	) {
		const device = await this.deviceSrv.find(id);
		if (!populate) return device;

		const { gatewayId, ...rest } = device;
		const gateway = await this.gatewaySrv.find(gatewayId);
		return { ...rest, gateway };
	}
}
