import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLXS from 'xlsx';
export interface PeriodicElement {
  name: string;
  position?: number;
  weight?: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'FirstName', weight: 33.0, symbol: 'Bhushan' },
  { name: 'LastName', weight: 4.0026, symbol: 'Gandole' },
  { name: 'DateOfBirth', weight: 6.941, symbol: '4-6-2005' },
  { name: 'Mobile NO', weight: 9.0122, symbol: '345645634' },
  { name: 'Gender', weight: 10.811, symbol: 'Male' },
  { name: 'Race', weight: 12.0107, symbol: 'Race' },
  { name: 'Ethnicity', weight: 14.0067, symbol: 'Ethnicity' },
  { name: 'email', weight: 15.9994, symbol: 'bhushan@gmail.com' },
  { name: 'known language', weight: 18.9984, symbol: 'Englich,Marathi' },
  { name: 'Address', weight: 20.1797, symbol: 'pune' },
];
const ELEMENT_DATA_EINFO: PeriodicElement[] = [
  { name: 'FirstName', weight: 12.0107, symbol: 'Robin' },
  { name: 'LastName', weight: 14.0067, symbol: 'Uthappa' },
  { name: 'Relationship', weight: 15.9994, symbol: 'Naighbor' },
  { name: 'Mobile NO', weight: 18.9984, symbol: '3456789' },
  { name: 'email', weight: 20.1797, symbol: 'robin@gmail.com' },
  { name: 'Address', weight: 15.9994, symbol: 'pune' },
  { name: 'Portal Access', weight: 18.9984, symbol: 'Yes' },
];

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.css'],
})
export class MyDetailsComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  searchStr = '';
  fileName = 'export-data.xlsx';

  displayedColumns: string[] = ['key', 'value'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource1 = new MatTableDataSource(ELEMENT_DATA_EINFO);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  onSearch() {
    this.dataSource.filter = this.searchStr;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getExcelData() {
    let element = document.getElementById('excel-id');
    const ws: XLXS.WorkSheet = XLXS.utils.table_to_sheet(element);

    const wb: XLXS.WorkBook = XLXS.utils.book_new();
    XLXS.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLXS.writeFile(wb, this.fileName);
  }
}
