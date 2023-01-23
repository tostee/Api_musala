import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from "class-validator";

const types = ["online", "offline"];

@ValidatorConstraint()
class Validator implements ValidatorConstraintInterface {
	constructor() {}

	async validate(value: any): Promise<boolean> {
		return types.indexOf(value) !== -1;
	}

	defaultMessage(args: ValidationArguments) {
		return `Field ${args.property} must one this values: ${types.join(", ")}.`;
	}
}

export function IsDeviceStatus(validationOptions?: ValidationOptions) {
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
