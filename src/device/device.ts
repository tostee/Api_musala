import { Gateway } from "src/gateway/gateway";

export type DeviceStatus = "online" | "offline";

export interface Device {
	id: string;
	createdAt: number; // timestamp
	gateway?: Gateway;
	gatewayId: string;
	status: DeviceStatus;
	vendor: string;
}
