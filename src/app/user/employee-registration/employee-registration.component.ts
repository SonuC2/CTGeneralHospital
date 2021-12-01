import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
interface Role {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css']
})

export class EmployeeRegistrationComponent implements OnInit {form: FormGroup = new FormGroup({});
  selectedValue: string | undefined;
  titleEmp: string[] = ['Mr.', 'Ms.', 'Dr.', 'Mrs.'];
  roles: Role[] = [
    {value: 'admin-0', viewValue: 'Admin'},
    {value: 'physician-1', viewValue: 'Physician'},
    {value: 'nurse-2', viewValue: 'Nurse'},
  ];
  constructor() { }

  ngOnInit(): void {
  }
  /*this.form = new FormGroup(
      {
        title: new FormControl(this.post?.title ? this.post.title : null, []),

        description: new FormControl(
          this.post?.description ? this.post.description : null,
          []
        ),
        imagePath: new FormControl(
          this.post?.imagePath ? this.post.imagePath : null,
          []
        ),
      },

      [postValidator()]
    );*/
onSave(){
  console.log("hi");
}
}
