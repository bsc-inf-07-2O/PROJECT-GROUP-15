"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const Student_dto_1 = require("./Student-dto");
class UpdateDto extends (0, mapped_types_1.PartialType)(Student_dto_1.CreateStudentDto) {
}
exports.UpdateDto = UpdateDto;
//# sourceMappingURL=update-dto.js.map