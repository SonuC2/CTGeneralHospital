import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  queryID:any;
  
  constructor(private route: ActivatedRoute,
    private router: Router){}
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log("Id from query"+params['queryID']);
     
    });
  }



}
