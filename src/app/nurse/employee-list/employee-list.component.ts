import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

export interface EmployeeData {
  id: number;
  firstName: string;
  lastName:string;
  designation: string;
  speciality:string;
  userType: string;
  status:boolean;
}

const ELEMENT_DATA: EmployeeData[] = [
  {id: 1, firstName: 'Ashwini', lastName: 'Mishra', designation: 'MD',speciality:'Anesthesiologist',userType:'Doctor',status:true},
  {id: 2, firstName: 'Milind', lastName: 'Patil', designation: 'Sr. Nurse',speciality:'NA',userType:'Nurse',status:true},
  {id: 3, firstName: 'Bhushan', lastName: 'Gupta', designation: 'MD',speciality:'Dentist',userType:'Doctor',status:true},
  {id: 4, firstName: 'Parag', lastName: 'Gaikwad', designation: 'MD',speciality:'Dentist',userType:'Doctor',status:false},
  {id: 5, firstName: 'Mansi', lastName: 'Chaudhary', designation: 'MBBS',speciality:'Anesthesiologist',userType:'Doctor',status:true},
  {id: 6, firstName: 'Priyanka', lastName: 'Gaykhe', designation: 'MD',speciality:'Cardiologist',userType:'Doctor',status:true},
  {id: 7, firstName: 'Amol', lastName: 'Baykar', designation: 'MD',speciality:'Cardiologist',userType:'Doctor',status:true},
  {id: 8, firstName: 'Vivek', lastName: 'Gupta', designation: 'Nurse',speciality:'NA',userType:'Nurse',status:true},
  {id: 9, firstName: 'Simran', lastName: 'Mishra', designation: 'Nurse',speciality:'NA',userType:'Nurse',status:true},
  {id: 10, firstName: 'Aman', lastName: 'Goenka', designation: 'MD',speciality:'gynecologist',userType:'Doctor',status:true},
];


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'designation','speciality','userType'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
id!:number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() queryID =0;
  isAdmin:boolean = false;
  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.isAdmin === true){
      this.displayedColumns = ['id', 'firstName', 'lastName', 'designation','speciality','userType','status'];
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRecord(row:any){
    console.log("Row id: " + row.id);
    
   this.queryID= row.id;
    
    this.router.navigate(['/nurse/employee-details/{{this.queryID}}'])
    
  }

  


}
