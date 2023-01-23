import { IsNotEmpty, MaxLength } from "class-validator";
import { DeviceStatus } from "./device";
import { IsDeviceStatus } from "./device-status.validator";

export class NewDeviceDto {
	@MaxLength(100)
	@IsNotEmpty()
	vendor: string;

	@IsDeviceStatus()
	@IsNotEmpty()
	status: DeviceStatus;
}
