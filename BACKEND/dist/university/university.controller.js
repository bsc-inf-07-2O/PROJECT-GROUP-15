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
exports.UniversityController = void 0;
const common_1 = require("@nestjs/common");
const university_service_1 = require("./university.service");
const create_university_dto_1 = require("./dto/create-university.dto");
const update_university_dto_1 = require("./dto/update-university.dto");
let UniversityController = class UniversityController {
    constructor(universityService) {
        this.universityService = universityService;
    }
    async createUniversity(userId, createUniversityDto) {
        return await this.universityService.createUniversity(userId, createUniversityDto);
    }
    async getAllUniversities() {
        return await this.universityService.getAllUniversities();
    }
    async getUniversityById(id) {
        return await this.universityService.getUniversityById(id);
    }
    async updateUniversity(id, updateUniversityDto) {
        return await this.universityService.updateUniversity(id, updateUniversityDto);
    }
    async removeUniversity(id) {
        return await this.universityService.removeUniversity(id);
    }
};
exports.UniversityController = UniversityController;
__decorate([
    (0, common_1.Post)(':userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_university_dto_1.CreateUniversityDto]),
    __metadata("design:returntype", Promise)
], UniversityController.prototype, "createUniversity", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UniversityController.prototype, "getAllUniversities", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UniversityController.prototype, "getUniversityById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_university_dto_1.UpdateUniversityDto]),
    __metadata("design:returntype", Promise)
], UniversityController.prototype, "updateUniversity", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UniversityController.prototype, "removeUniversity", null);
exports.UniversityController = UniversityController = __decorate([
    (0, common_1.Controller)('university'),
    __metadata("design:paramtypes", [university_service_1.UniversityService])
], UniversityController);
//# sourceMappingURL=university.controller.js.map