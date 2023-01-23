import { Device } from "src/device/device";

export interface Gateway {
	id: string;
	name: string;
	ipAddress: string;
	devices?: Device[];
}
