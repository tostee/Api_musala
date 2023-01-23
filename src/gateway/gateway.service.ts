import { Injectable } from "@nestjs/common";
import { GATEWAYS } from "src/memory";
import { v4 as uuidV4 } from "uuid";
import { Gateway } from "./gateway";
import { NewGatewayDto } from "./gateway.dto";

@Injectable()
export class GatewayService {
	private gateways: Gateway[] = GATEWAYS;

	constructor() {}

	async findAll(): Promise<Gateway[]> {
		return [...this.gateways];
	}

	async find(id: string): Promise<Gateway | null> {
		return this.gateways.find((g) => g.id === id) ?? null;
	}

	async create(data: NewGatewayDto): Promise<Gateway> {
		const gway = { id: uuidV4(), ...data };
		this.gateways = [...this.gateways, gway];
		return gway;
	}
}
