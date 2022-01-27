import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { windowWhen } from 'rxjs';
import { Employee } from 'src/app/entities/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  disabled = false;
  employees: Employee[] = [];

  displayedColumns = ['employeeId', 'firstName', 'lastName','mobileNO', 'email','specialisation', 'roleType','status', 'action', 'blockAction'];
  dataSource = new MatTableDataSource<Employee>();
  id!:number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() queryID =0;
  isAdmin:boolean = false;
  // employee: any;
  constructor(public dialog: MatDialog, private router: Router,private route: ActivatedRoute, private employeeService : EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployeeList().subscribe(employees =>{
      this.employees = employees;
      this.dataSource.data = this.employees;
      console.log("Data source : " , this.dataSource.data);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    console.log("filter value", filterValue);
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  activeToInactiveStatus(employee:Employee) {
    console.log(employee);
    this.employeeService.activeToInactiveStatus(employee).subscribe();
    window.location.reload();
  }
  inactiveToActiveStatus(employee:Employee) {
    console.log(employee);
    this.employeeService.inactiveToActiveStatus(employee).subscribe();
    window.location.reload();
  }

  unblockToBlockStatus(employee:Employee) {
    console.log(employee);
    this.employeeService.unblockToBlockStatus(employee).subscribe();
    window.location.reload();
  }

  blockToUnblockStatus(employee:Employee) {
    this.employeeService.blockToUnblockStatus(employee).subscribe();
    window.location.reload();
  }

  registerUser() {
    this.router.navigate(["/shared/sidebar/admin/register-user/"]);
  }

  editUser(row:Employee) {
    console.log("inside edit user",row.employeeId);
    this.router.navigate(["/shared/sidebar/admin/edit-user/"+row.employeeId]);
  }
}
