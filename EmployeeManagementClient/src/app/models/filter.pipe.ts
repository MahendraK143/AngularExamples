import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './employee';

@Pipe({
    name: 'filter'
  })
  export class FilterPipe implements PipeTransform {
    transform(employees: Employee[], searchText: string): any[] {
      if(!employees) return [];
      if(!searchText) return employees;
        
      searchText = searchText.toLowerCase();
        
      return employees.filter( emp => {
        return (emp.employeeId.toString().includes(searchText) ||
        emp.ename.toLowerCase().includes(searchText) || 
        emp.salary.toString().includes(searchText) ||
        emp.manager.toLowerCase().includes(searchText) ||
        emp.job.toLowerCase().includes(searchText) ||
        emp.hiredate.toLowerCase().includes(searchText));
      });
     }
  }