"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailerModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_service_1 = require("./mailer.service");
const mailer_1 = require("@nestjs-modules/mailer");
let mailerModule = class mailerModule {
};
exports.mailerModule = mailerModule;
exports.mailerModule = mailerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.EMAIL_HOST,
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                },
            }),
        ],
        providers: [mailer_service_1.EmailService],
        exports: [mailer_service_1.EmailService],
    })
], mailerModule);
//# sourceMappingURL=mailer.module.js.map