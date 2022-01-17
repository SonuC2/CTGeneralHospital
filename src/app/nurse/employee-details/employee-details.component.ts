import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/entities/employee';
import { UserRole } from 'src/app/entities/user-role';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  empId:any;
  employee !: Employee;
  userRoleType !:any;
  userRole!: UserRole;
  role!:string;
  constructor(private route: ActivatedRoute,
    private router: Router, private employeeService : EmployeeService){}
  
  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   console.log("Id from query"+params['queryID']);
     
    // });
    this.empId =  this.route.snapshot.paramMap.get("id");
    console.log("id from details:" , this.empId);

    this.employeeService.getEmployeeById(this.empId).subscribe(employee =>{
      this.employee = employee;
      console.log("Data source : " , this.employee);
      this.userRoleType = this.employee.userRole.userRoleId;
      if(this.userRoleType === 1){
        this.role = "Physician";
      }
      if(this.userRoleType === 2){
        this.role = "Nurse";
      }

      // this.firstName = this.employee.firstName;
      console.log("user role: " +  this.userRoleType);
      
    }) 
  }

  navigateToEmployeeList(){
    this.router.navigate(['/nurse/employee-list'])
  }
}
