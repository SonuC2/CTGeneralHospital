import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';

export interface AllergyData {
  id: string;
  allergyName: string;
  allergyType:string;
  description: string;
  information:string;
}

const ELEMENT_DATA: AllergyData[] = [
  {id: "A101", allergyName: 'Dog', allergyType: 'Animal', description: 'Canis familiaris',information:'NA'},
  {id: "A102", allergyName: 'Cat', allergyType: 'Animal', description: 'Canis familiaris',information:'NA'},
  {id: "A103", allergyName: 'Insect', allergyType: 'Americal Cockroach', description: 'Canis familiaris',information:'NA'},
  ];

@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.css'],
})
export class PatientVisitComponent implements OnInit {
  hideAllergy = true;
  allergyform!: FormGroup;
  myControl = new FormControl();
  physicanNameControl = new FormControl();
  options: string[] = ['P101', 'P102', 'P103'];
  physicianNames: string[] = [
    'Priyanka Gaykhe',
    'Amol Baykar',
    'Mansi Mishra',
    'Bhushan G',
    'Parag Gaikwad',
  ];
  filteredOptions!: Observable<string[]>;
  filteredOptions1!: Observable<string[]>;
// for allergy table
  displayedColumns: string[] = ['id', 'allergyType', 'allergyName', 'description','information'];
  displayedColumsDiagnosis:string[] =['diagCode','diagDescription','actions']
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSourceDiagnosis = new MatTableDataSource([{diagCode:'A100',diagDescription:'Cholera'}]);
  @ViewChild(MatSort) sort!: MatSort;


  diagnosisCode :string[] =['A00','A00.1','B00'];
  diagnosisId="None";
  constructor() {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.filteredOptions1 = this.physicanNameControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter1(value))
    );
    // if(this.myControl.valueChanges){
    //   console.log("inside first if");
      
    //   this.filteredOptions = this.myControl.valueChanges.pipe(
    //     startWith(''),
    //     map((value) => this._filter(value))
    //   );
    // }else if(this.physicanNameControl.valueChanges){
    //   console.log("inside else");
      
    //   this.filteredOptions = this.physicanNameControl.valueChanges.pipe(
    //     startWith(''),
    //     map((value) => this._filter1(value))
    //   );
    // }

    this.allergyform = new FormGroup({
      allergyId: new FormControl(null),
      allergyType: new FormControl(null),
      allergyName: new FormControl(null),
      allergyDescription: new FormControl(null),
      allergyInfo: new FormControl(null),
    });
  }

  allergyFalse(event: any) {
    console.log('event falsr');
    if (event.target.click) {
      this.hideAllergy = false;
    }
    if (!event.target.click) {
      this.hideAllergy = true;
    }
  }
  allergyTrue(event: any) {
    console.log('event true');
    if (event.target.click) {
      this.hideAllergy = true;
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.physicianNames.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }


}
