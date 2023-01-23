import { Injectable } from "@nestjs/common";
import { DEVICES } from "src/memory";
import { v4 as uuidV4 } from "uuid";
import { Device } from "./device";
import { NewDeviceDto } from "./device.dto";

@Injectable()
export class DeviceService {
	private devices: Device[] = DEVICES;

	async findAll(): Promise<Device[]> {
		return [...this.devices];
	}

	async find(id: string): Promise<Device | null> {
		return this.devices.find((g) => g.id === id) ?? null;
	}

	async findByGatewayId(id: string): Promise<Device[]> {
		return this.devices.filter((g) => g.gatewayId === id);
	}

	async create(gatewayId: string, data: NewDeviceDto): Promise<Device> {
		const obj: Device = {
			id: uuidV4(),
			createdAt: new Date().getTime(),
			gatewayId,
			...data,
		};
		this.devices = [...this.devices, obj];
		return obj;
	}
}
