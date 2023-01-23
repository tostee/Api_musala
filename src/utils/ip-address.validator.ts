import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from "class-validator";

const REGEX =
	/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

@ValidatorConstraint()
class Validator implements ValidatorConstraintInterface {
	constructor() {}

	async validate(value: any): Promise<boolean> {
		return REGEX.test(value);
	}

	defaultMessage(args: ValidationArguments) {
		return `Invalid IP Address.`;
	}
}

export function IsIpAddress(validationOptions?: ValidationOptions) {
	return (object: Object, propertyName: string) => {
		registerDecorator({
			async: true,
			constraints: [],
			options: validationOptions,
			propertyName: propertyName,
			target: object.constructor,
			validator: Validator,
		});
	};
}
