import {
	Body,
	ConflictException,
	Controller,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import { BasicAuthGuard } from "src/auth.guard";
import { NewDeviceDto } from "src/device/device.dto";
import { DeviceService } from "src/device/device.service";
import { ErrorCode } from "src/utils/error-code";
import { NewGatewayDto } from "./gateway.dto";
import { GatewayService } from "./gateway.service";

@Controller("gateways")
@UseGuards(BasicAuthGuard)
export class GatewayController {
	constructor(
		private readonly gatewaySrv: GatewayService,
		private readonly deviceSrv: DeviceService,
	) {}

	@Get()
	getList() {
		return this.gatewaySrv.findAll();
	}

	@Get(":id")
	async getById(
		@Param("id") id: string,
		@Query("populate") populate: boolean = false,
	) {
		const gateway = await this.gatewaySrv.find(id);
		if (populate) {
			const devices = await this.deviceSrv.findByGatewayId(id);
			gateway.devices = devices;
		}
		return gateway;
	}

	@Post()
	@HttpCode(201)
	create(@Body() data: NewGatewayDto) {
		return this.gatewaySrv.create(data);
	}

	@Post("/:id/devices")
	async getDevicesList(@Param("id") id: string, @Body() data: NewDeviceDto) {
		const gateway = await this.gatewaySrv.find(id);
		if (!gateway) {
			throw new NotFoundException({
				message: "Gateway not found.",
				code: ErrorCode.notFound,
			});
		}
		const devices = await this.deviceSrv.findByGatewayId(id);
		if (devices.length >= 10) {
			throw new ConflictException({
				message: "You have reached the max amount of devices on this gateway.",
				code: ErrorCode.invalidRequest,
			});
		}

		return this.deviceSrv.create(id, data);
	}
}
