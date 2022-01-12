import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
export interface EmployeeData {
  id: number;
  firstName: string;
  lastName: string;
  designation: string;
  speciality: string;
  userType: string;
}

const ELEMENT_DATA: EmployeeData[] = [
  {
    id: 1,
    firstName: 'Ashwini',
    lastName: 'Mishra',
    designation: 'MD',
    speciality: 'Anesthesiologist',
    userType: 'Doctor',
  },
  {
    id: 2,
    firstName: 'Milind',
    lastName: 'Patil',
    designation: 'Sr. Nurse',
    speciality: 'NA',
    userType: 'Nurse',
  },
  {
    id: 3,
    firstName: 'Bhushan',
    lastName: 'Gupta',
    designation: 'MD',
    speciality: 'Dentist',
    userType: 'Doctor',
  },
  {
    id: 4,
    firstName: 'Parag',
    lastName: 'Gaikwad',
    designation: 'MD',
    speciality: 'Dentist',
    userType: 'Doctor',
  },
  {
    id: 5,
    firstName: 'Mansi',
    lastName: 'Chaudhary',
    designation: 'MBBS',
    speciality: 'Anesthesiologist',
    userType: 'Doctor',
  },
  {
    id: 6,
    firstName: 'Priyanka',
    lastName: 'Gaykhe',
    designation: 'MD',
    speciality: 'Cardiologist',
    userType: 'Doctor',
  },
  {
    id: 7,
    firstName: 'Amol',
    lastName: 'Baykar',
    designation: 'MD',
    speciality: 'Cardiologist',
    userType: 'Doctor',
  },
  {
    id: 8,
    firstName: 'Vivek',
    lastName: 'Gupta',
    designation: 'Nurse',
    speciality: 'NA',
    userType: 'Nurse',
  },
  {
    id: 9,
    firstName: 'Simran',
    lastName: 'Mishra',
    designation: 'Nurse',
    speciality: 'NA',
    userType: 'Nurse',
  },
  {
    id: 10,
    firstName: 'Aman',
    lastName: 'Goenka',
    designation: 'MD',
    speciality: 'gynecologist',
    userType: 'Doctor',
  },
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'designation',
    'speciality',
    'userType',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) {}

  ngOnInit(): void {}

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

  getRecord(row: any) {
    console.log(row.id);
    this.router.navigate(['/admin/admin']);
  }
}
