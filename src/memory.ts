import { Device } from "./device/device";
import { Gateway } from "./gateway/gateway";

export const GATEWAYS: Gateway[] = [
	{ id: "001", name: "Sit no sit lorem", ipAddress: "10.0.0.1" },
	{ id: "002", name: "Vero lorem et clita", ipAddress: "10.0.0.2" },
	{ id: "003", name: "Dolor et clita gubergren", ipAddress: "10.0.0.3" },
];

export const DEVICES: Device[] = [
	{
		id: "001",
		createdAt: new Date().getTime(),
		vendor: "Vendor",
		status: "online",
		gatewayId: "001",
	},
	{
		id: "002",
		createdAt: new Date().getTime(),
		vendor: "Vendor 2",
		status: "offline",
		gatewayId: "001",
	},
	{
		id: "003",
		createdAt: new Date().getTime(),
		vendor: "Vendor 3",
		status: "online",
		gatewayId: "002",
	},
];

export const BASIC_TOKENS = ["admin", "testing", "..."];
