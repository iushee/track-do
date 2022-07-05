import { Behavior } from "src/modules/behaviors/entities/behavior.entity";
import { User } from "src/modules/users/entitiy/user.entity";
import { ExclusionMetadata } from "typeorm/metadata/ExclusionMetadata";

export class CreateTaskDto {
    readonly name: string;
    readonly behavior: Behavior;
    createdBy?: User;
}
