"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmAsyncConfig = void 0;
const Student_entity_1 = require("../users/Student.entity");
const bonding_entity_1 = require("../bonding/bonding-entity");
const erigibility_entity_1 = require("../erigible/erigibility-entity");
const University_entity_1 = require("../university/University.entity");
exports.typeOrmAsyncConfig = {
    useFactory: async () => {
        const dbPort = parseInt(process.env.DB_PORT || '5433', 10);
        const dbHost = process.env.DB_HOST || 'localhost';
        const dbUsername = process.env.DB_USERNAME || 'defaultUser';
        const dbPassword = process.env.DB_PASSWORD || 'defaultPassword';
        const dbName = process.env.DB_NAME || 'defaultDB';
        return {
            type: 'postgres',
            host: dbHost,
            port: dbPort,
            username: dbUsername,
            password: dbPassword,
            database: dbName,
            entities: [Student_entity_1.User, bonding_entity_1.Bonding, erigibility_entity_1.Eligible, University_entity_1.University],
            migrations: [__dirname + '/../migrations/*{.ts,.js}'],
            extra: {
                charset: 'utf8mb4_unicode_ci',
            },
            synchronize: true,
            logging: true,
            connectTimeoutMS: 30000,
        };
    },
};
//# sourceMappingURL=typeorm.config.js.map