import { Injectable } from '@nestjs/common';
import { Schema } from './entities/schema.entity';

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ircc',
    password: 'herings',
    port: 5432,
});
client.connect(); // postgre 접속

@Injectable()
export class SchemaService {
    private readonly schemas: Schema[] = [];

    gs = (sql : string) => {
        return new Promise((resolve, reject) => {
            client.query(sql, (err, res) => {
                console.log(" res >> ", res);
                if (res) {
                    resolve(res);
                } else {
                    reject(err);
                }
            });
        })
    };

    async create(schemaName: string) {
        let projectName = schemaName;
        try {
            let createSchemaSQL = `CREATE SCHEMA IF NOT EXISTS ${projectName};`;
            await this.gs(createSchemaSQL);
            return this.getSchemas();
            
        } catch (ex) {
            console.log("exception => ", ex);
            return ex;
        }
    }

    async getSchemas() {
        try {
            let getSchemaSQL = `select schema_name from information_schema.schemata where schema_name NOT in ('public','pg_catalog','pg_toast_temp_1','pg_temp_1','pg_toast', 'information_schema')`;
            let result = await this.gs(getSchemaSQL);
            return result;
        } catch (ex) {
            console.log("exception => ", ex);
            return ex;
        }
    }
}