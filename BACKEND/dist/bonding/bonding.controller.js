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
exports.BondingController = void 0;
const common_1 = require("@nestjs/common");
const bonding_service_1 = require("./bonding.service");
const create_bonding_1 = require("./dto/create-bonding");
const update_bonding_1 = require("./dto/update-bonding");
const create_university_dto_1 = require("../university/dto/create-university.dto");
const university_service_1 = require("../university/university.service");
let BondingController = class BondingController {
    constructor(bondingService, universityService) {
        this.bondingService = bondingService;
        this.universityService = universityService;
    }
    async createBondingForUser(userId, createBondingDto, universityData) {
        const hasBonded = await this.bondingService.hasUserBonded(userId);
        if (hasBonded) {
            return { message: 'User has already completed bonding.' };
        }
        const university = await this.universityService.createUniversity(userId, universityData);
        createBondingDto.universityId = university.id;
        const bonding = await this.bondingService.createBonding(createBondingDto, userId);
        return bonding;
    }
    async getBondingByUserId(userId) {
        return await this.bondingService.getBondingByUserId(userId);
    }
    async updateBonding(id, updateBondingDto) {
        return await this.bondingService.updateBonding(id, updateBondingDto);
    }
    async removeBonding(id) {
        return await this.bondingService.removeBonding(id);
    }
};
exports.BondingController = BondingController;
__decorate([
    (0, common_1.Post)('/register/user/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_bonding_1.CreateBonding,
        create_university_dto_1.CreateUniversityDto]),
    __metadata("design:returntype", Promise)
], BondingController.prototype, "createBondingForUser", null);
__decorate([
    (0, common_1.Get)('/user/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BondingController.prototype, "getBondingByUserId", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_bonding_1.UpdateBonding]),
    __metadata("design:returntype", Promise)
], BondingController.prototype, "updateBonding", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BondingController.prototype, "removeBonding", null);
exports.BondingController = BondingController = __decorate([
    (0, common_1.Controller)('bonding'),
    __metadata("design:paramtypes", [bonding_service_1.BondingService,
        university_service_1.UniversityService])
], BondingController);
//# sourceMappingURL=bonding.controller.js.map