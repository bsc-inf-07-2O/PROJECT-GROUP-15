"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErigibleController = void 0;
const common_1 = require("@nestjs/common");
const erigible_service_1 = require("./erigible.service");
const Student_dto_1 = require("./dto/Student-dto");
const update_dto_1 = require("./dto/update-dto");
let ErigibleController = class ErigibleController {
    constructor(erigibleService) {
        this.erigibleService = erigibleService;
    }
    async createStudent(createStudentDto) {
        return await this.erigibleService.createStudent(createStudentDto);
    }
    async getAllStudents() {
        return await this.erigibleService.getAllStudents();
    }
    async getStudentById(id) {
        return await this.erigibleService.getStudentById(id);
    }
    async updateStudent(id, updateStudentDto) {
        return await this.erigibleService.updateStudent(id, updateStudentDto);
    }
    async removeStudent(id) {
        return await this.erigibleService.removeStudent(id);
    }
    async checkEligibility(body) {
        return await this.erigibleService.checkEligibility(body.FirstName, body.SurName);
    }
};
exports.ErigibleController = ErigibleController;
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], ErigibleController.prototype, "createStudent", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ErigibleController.prototype, "getAllStudents", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ErigibleController.prototype, "getStudentById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_dto_1.UpdateDto]),
    __metadata("design:returntype", Promise)
], ErigibleController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ErigibleController.prototype, "removeStudent", null);
__decorate([
    (0, common_1.Post)('/check'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ErigibleController.prototype, "checkEligibility", null);
exports.ErigibleController = ErigibleController = __decorate([
    (0, common_1.Controller)('erigible'),
    __metadata("design:paramtypes", [erigible_service_1.ErigibleService])
], ErigibleController);
//# sourceMappingURL=erigible.controller.js.map