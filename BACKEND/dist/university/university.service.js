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
exports.UniversityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const University_entity_1 = require("./University.entity");
let UniversityService = class UniversityService {
    constructor(universityRepository) {
        this.universityRepository = universityRepository;
    }
    async createUniversity(userId, createUniversityDto) {
        const university = this.universityRepository.create(createUniversityDto);
        return await this.universityRepository.save(university);
    }
    async getAllUniversities() {
        return await this.universityRepository.find({ relations: ['bondings'] });
    }
    async getUniversityById(id) {
        const university = await this.universityRepository.findOne({ where: { id }, relations: ['bondings'] });
        if (!university) {
            throw new common_1.NotFoundException(`University with ID ${id} not found`);
        }
        return university;
    }
    async updateUniversity(id, updateUniversityDto) {
        const university = await this.getUniversityById(id);
        Object.assign(university, updateUniversityDto);
        return await this.universityRepository.save(university);
    }
    async removeUniversity(id) {
        const university = await this.getUniversityById(id);
        await this.universityRepository.remove(university);
        return university;
    }
};
exports.UniversityService = UniversityService;
exports.UniversityService = UniversityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(University_entity_1.University)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UniversityService);
//# sourceMappingURL=university.service.js.map