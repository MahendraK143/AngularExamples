import { Department } from './department';

export class Employee {
    constructor(
        public employeeId:number,
        public ename:string, 
        public job:string,
        public manager:string, 
        public hiredate:string,
        public salary:number,
        public password,
        public department:Department
        ){}
}