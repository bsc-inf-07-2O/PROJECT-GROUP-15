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
exports.BondingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bonding_entity_1 = require("./bonding-entity");
const Student_entity_1 = require("../users/Student.entity");
const University_entity_1 = require("../university/University.entity");
let BondingService = class BondingService {
    constructor(bondingRepository, userRepository, universityRepository) {
        this.bondingRepository = bondingRepository;
        this.userRepository = userRepository;
        this.universityRepository = universityRepository;
    }
    async createBonding(createBondingDto, userId) {
        let user = null;
        if (userId) {
            user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${userId} not found`);
            }
            const existingBonding = await this.bondingRepository.findOne({ where: { user: { id: userId } } });
            if (existingBonding) {
                throw new common_1.BadRequestException(`You have already completed the bonding process.`);
            }
        }
        const bonding = this.bondingRepository.create({
            ...createBondingDto,
            user: user || undefined,
            firstName: createBondingDto.FirstName,
            surName: createBondingDto.SurName,
            dateOfBirth: createBondingDto.DateOfBirth,
            sex: createBondingDto.Sex,
            TA: createBondingDto.TA,
            NationalIdNo: createBondingDto.NationalIdNo,
            District: createBondingDto.District,
            PostalAddress: createBondingDto.PostalAddress,
            phoneNumber: createBondingDto.PhoneNumber,
            homeVillage: createBondingDto.HomeVillage,
            nationalId: createBondingDto.nationalId,
            studentId: createBondingDto.studentId,
            tuitionAmount: parseFloat(createBondingDto.Tuition || '0'),
            upkeepAmount: parseFloat(createBondingDto.UpkeepAmount || '0'),
            guardianFullName: createBondingDto.GuardianFullName,
            guardianPostalAddress: createBondingDto.GuardianPostalAddress,
            guardianPhysicalAddress: createBondingDto.GuardianPhysicalAddress,
            guardianHomeVillage: createBondingDto.GuardianHomeVillage,
            guardianDistrict: createBondingDto.GuardianDistrict,
            guardianOccupation: createBondingDto.GuardianOccupation,
            guardianPhoneNumber: createBondingDto.GuardianPhoneNumber,
            bankName: createBondingDto.BankName,
            branch: createBondingDto.Branch,
            accountName: createBondingDto.AccountName,
            accountNumber: createBondingDto.AccountNumber,
        });
        const university = await this.universityRepository.findOne({
            where: { id: createBondingDto.universityId },
        });
        if (!university) {
            throw new common_1.NotFoundException(`University with ID ${createBondingDto.universityId} not found`);
        }
        bonding.university = university;
        return await this.bondingRepository.save(bonding);
    }
    async getAllBondings() {
        return await this.bondingRepository.find();
    }
    async getBondingById(id) {
        const bonding = await this.bondingRepository.findOne({ where: { id } });
        if (!bonding) {
            throw new common_1.NotFoundException(`Bonding with ID ${id} not found`);
        }
        return bonding;
    }
    async getBondingByUserId(userId) {
        const userBondings = await this.bondingRepository.find({
            where: { user: { id: userId } },
            relations: ['user', 'university'],
        });
        if (userBondings.length === 0) {
            throw new common_1.NotFoundException(`No bonding entries found for user with ID ${userId}`);
        }
        return userBondings;
    }
    async hasUserBonded(userId) {
        const count = await this.bondingRepository.count({
            where: { user: { id: userId } },
        });
        return count > 0;
    }
    async updateBonding(id, updateBondingDto) {
        const bonding = await this.getBondingById(id);
        Object.assign(bonding, updateBondingDto);
        return await this.bondingRepository.save(bonding);
    }
    async removeBonding(id) {
        const bonding = await this.bondingRepository.findOne({
            where: { id },
            relations: ['university'],
        });
        if (!bonding) {
            throw new Error(`Bonding with ID ${id} not found`);
        }
        if (bonding?.university) {
            await this.universityRepository.remove(bonding.university);
        }
        return await this.bondingRepository.remove(bonding);
    }
};
exports.BondingService = BondingService;
exports.BondingService = BondingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bonding_entity_1.Bonding)),
    __param(1, (0, typeorm_1.InjectRepository)(Student_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(University_entity_1.University)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BondingService);
//# sourceMappingURL=bonding.service.js.map