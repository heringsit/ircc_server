import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ircc',
  password: 'shsbsy70',
  port: 5432,
});

const xlsx = require('xlsx');
let sheets = [];

@Controller('uploads')
export class UploadsController {
  constructor() { }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Body() data) {
    try {
      console.log("file => ", file);
      console.log("project => ", data.project);
      client.connect(); // postgre 접속
      const workbook = xlsx.read(file.buffer);
      let sheetNameList = workbook.SheetNames; // 시트 이름 목록 가져오기
      try {
        for (let i = 0; i < sheetNameList.length; i++) {
          this.createTable(workbook.Sheets[sheetNameList[i]], data.project+"."+sheetNameList[i]);
        }
      } catch (ex) {
        console.log("exception => ", ex);
      }

      setTimeout(()=>{
        client.end();
      },4500)
      return true
    } catch (e) {
      return null;
    }
  }

  createTable(aSheet: any, sheetName: string): boolean {
    console.log("sheetName >> ", sheetName);

    let rows = xlsx.utils.sheet_to_json(aSheet,{raw: true, defval:null});
    console.log(" jsonRow => ", rows);
    let types = [];
    if (rows.length > 0) {
      let fields = Object.keys(rows[0]);
      let values_ = Object.values(rows[0]);
      types = values_.map((each) => {
        if (typeof (each) === 'string') {
          if (each.includes('-', 6)) {
            return "date"
          } else {
            return "text";
          }
        } else if (typeof (each) === 'number') {
          if (each.toString().includes('.')) {
            return "real";
          } else {
            return "integer";
          }
        } else {
          return "text";
        }
      });

      // console.log(" types => ", types);
      // console.log(" fields => ", fields);
      let sqlFieldType="";
      fields.forEach((each, index) => {
        if(index !== fields.length-1){
          sqlFieldType = sqlFieldType + each + " " + types[index] +", ";  
        }else{
          sqlFieldType = sqlFieldType + each + " " + types[index];  
        }
      });
      // console.log(" sqlFieldType >> ", sqlFieldType);
  
      let createSQL = `CREATE TABLE ${sheetName} (${sqlFieldType});`;
      client.query(createSQL, (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Table is successfully created');
        let insertValues = "";
        rows.forEach((each,index) =>{
          Object.values(each).forEach((val,idx) =>{
            if(val === null){
              if(types[idx] === 'text'){
                val = '';
              }else if(types[idx] === 'integer'){
                val = 0;
              }else if(types[idx] === 'real'){
                val = 0.0;
              }else if(types[idx] === 'date'){
                val = "2021-01-01";
              }
            }

            if(idx === 0){
              insertValues = insertValues + `('${val}',`
            }else if(idx !== Object.values(each).length-1){
              insertValues = insertValues + `'${val}',`
            }else{
              insertValues = insertValues + `'${val}'),`
            }
          }) 
        });
        insertValues = insertValues.slice(0,-1);
        console.log(" insertValues => ", insertValues);
        let insertSQL = `INSERT INTO ${sheetName} VALUES ${insertValues};`;
        console.log(" inertSQL => ", insertSQL);
        client.query(insertSQL, (insertErr, insertRes)=>{
          if(insertErr){
            console.error(insertErr);
            console.log("insertSQL => ", insertSQL);
            return;
          }
          console.log('Values are successfully inserted');
        });
      });
      
      return true
    } else {
      return false
    }
  }

}
