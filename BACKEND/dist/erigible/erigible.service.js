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
exports.ErigibleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const erigibility_entity_1 = require("./erigibility-entity");
let ErigibleService = class ErigibleService {
    constructor(eligibleRepository) {
        this.eligibleRepository = eligibleRepository;
    }
    async checkEligibility(firstName, surName) {
        const student = await this.eligibleRepository.findOne({
            where: {
                FirstName: firstName,
                SurName: surName,
            },
        });
        if (!student) {
            return { isEligible: false };
        }
        const predefinedTuitionLimit = 500000;
        const predefinedUpkeepLimit = 300000;
        const totalAmount = predefinedTuitionLimit + predefinedUpkeepLimit;
        const isEligible = totalAmount <= student.tuition + student.upkeep;
        return { isEligible };
    }
    async createStudent(createStudentDto) {
        const total = createStudentDto.tuition + createStudentDto.upkeep;
        const student = this.eligibleRepository.create({
            FirstName: createStudentDto.FirstName,
            SurName: createStudentDto.SurName,
            university: createStudentDto.university,
            tuition: createStudentDto.tuition,
            upkeep: createStudentDto.upkeep,
            total: total,
        });
        return await this.eligibleRepository.save(student);
    }
    async getAllStudents() {
        return await this.eligibleRepository.find();
    }
    async getStudentById(id) {
        const student = await this.eligibleRepository.findOne({ where: { id } });
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        return student;
    }
    async updateStudent(id, updateStudentDto) {
        const student = await this.getStudentById(id);
        Object.assign(student, updateStudentDto);
        return await this.eligibleRepository.save(student);
    }
    async removeStudent(id) {
        const student = await this.getStudentById(id);
        await this.eligibleRepository.remove(student);
        return student;
    }
};
exports.ErigibleService = ErigibleService;
exports.ErigibleService = ErigibleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(erigibility_entity_1.Eligible)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ErigibleService);
//# sourceMappingURL=erigible.service.js.map