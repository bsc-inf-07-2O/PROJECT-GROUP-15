"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BondingModule = void 0;
const common_1 = require("@nestjs/common");
const bonding_service_1 = require("./bonding.service");
const bonding_controller_1 = require("./bonding.controller");
const typeorm_1 = require("@nestjs/typeorm");
const bonding_entity_1 = require("./bonding-entity");
const users_module_1 = require("../users/users.module");
const university_module_1 = require("../university/university.module");
const Student_entity_1 = require("../users/Student.entity");
const University_entity_1 = require("../university/University.entity");
let BondingModule = class BondingModule {
};
exports.BondingModule = BondingModule;
exports.BondingModule = BondingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([bonding_entity_1.Bonding, Student_entity_1.User, University_entity_1.University]),
            users_module_1.UsersModule,
            university_module_1.UniversityModule,
        ],
        providers: [bonding_service_1.BondingService],
        controllers: [bonding_controller_1.BondingController],
    })
], BondingModule);
//# sourceMappingURL=bonding.module.js.map