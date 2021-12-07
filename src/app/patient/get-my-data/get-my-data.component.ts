import { Component, OnInit } from '@angular/core';
import * as XLXS from 'xlsx';


@Component({
  selector: 'app-get-my-data',
  templateUrl: './get-my-data.component.html',
  styleUrls: ['./get-my-data.component.css']
})
export class GetMyDataComponent implements OnInit {
  fileName = 'export-data.xlsx';
  hid:boolean=true;

  list:string[]=["Bhushan","sonu","Priyanka","Mansi","Parag"];
  constructor() { }

  ngOnInit(): void {
  }
  getExcelData() {
    let element = document.getElementById('excel-id');
    const ws: XLXS.WorkSheet = XLXS.utils.table_to_sheet(element);

    const wb: XLXS.WorkBook = XLXS.utils.book_new();
    XLXS.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLXS.writeFile(wb, this.fileName);
  }
}
