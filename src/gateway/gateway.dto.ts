import { IsNotEmpty, MaxLength } from "class-validator";
import { IsIpAddress } from "src/utils/ip-address.validator";

export class NewGatewayDto {
	@MaxLength(100)
	@IsNotEmpty()
	name: string;

	// ip v4
	@MaxLength(15)
	@IsNotEmpty()
	@IsIpAddress()
	ipAddress: string;
}
