import { RESTORED_VIEW_CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/entities/employee';
import { EmployeeDTO } from 'src/app/entities/employee-dto';
import { Inbox } from 'src/app/entities/inbox';
import { InboxService } from 'src/app/services/inbox.service';
import { ReplyNoteDialogComponent } from '../reply-note-dialog/reply-note-dialog.component';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent implements OnInit {
  sendNoteForm!: any;
  employees!: EmployeeDTO[];
  specialisationControl!: FormControl;
  designation!: string;
  sentNotes!: Inbox[];
  receivedNote!: Inbox[];
  private inbox!: Inbox[];

  displayedColumnsSent: string[] = [
    'receiverId',
    'receiverName',
    'receiverSpecialisation',
    'messege',
    'sendNoteTime',
    'urgencyLevel',
    'actions',
  ];
  displayedColumnsReceived: string[] = [
    'senderId',
    'senderName',
    'senderSpecialisation',
    'messege',
    'sendNoteTime',
    'urgencyLevel',
    'actions',
  ];
  dataSourceSent = new MatTableDataSource<Inbox>();
  dataSourceReceived = new MatTableDataSource<Inbox>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  senderId!: number;
  receiverId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private inboxService: InboxService,
    public dialog: MatDialog
  ) {}

  selectedEmployee: any;
  ngOnInit(): void {
    this.sendNoteForm = this.fb.group({
      receiverId: [''],
      receiverName: [''],
      receiverSpecialisation: [''],
      senderId: [1],
      senderName: ['priyanka Gaykhe'],
      senderSpecialisation: ['Heart surgeon'],
      messege: [''],
      urgencyLevel: [''],
      responseStatus: [''],
    });

    this.senderId = 1;
    this.receiverId = 1;
    this.inboxService.getAllEmployeeList().subscribe((employees) => {
      this.employees = employees;
      console.log('Employee details in Inbox: ', this.employees);
    });

    // this.senderId = this.sendNoteForm.controls['receiverName'].value;

    // this.dataSourceSent = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSourceSent.paginator = this.paginator;
    this.dataSourceSent.sort = this.sort;

    this.dataSourceReceived.paginator = this.paginator;
    this.dataSourceReceived.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSent.filter = filterValue.trim().toLowerCase();

    console.log('filter value', filterValue);

    if (this.dataSourceSent.paginator) {
      this.dataSourceSent.paginator.firstPage();
    }
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceReceived.filter = filterValue.trim().toLowerCase();

    console.log('filter value', filterValue);

    if (this.dataSourceReceived.paginator) {
      this.dataSourceReceived.paginator.firstPage();
    }
  }

  sendNote() {
    this.sendNoteForm.controls['senderId'].setValue(1);
    // let name = employee.firstName + " " + employee.lastName
    this.sendNoteForm.controls['senderName'].setValue('Priyanka Gaykhe');
    this.sendNoteForm.controls['senderSpecialisation'].setValue(
      'Heart Surgeon'
    );
    console.log('form: ', this.sendNoteForm.value);
    this.inboxService.sendNote(this.sendNoteForm.value).subscribe();

    this.sendNoteForm.reset();
    console.log('note is sent');
  }

  loadDesignation(employee: EmployeeDTO, event: any) {
    console.log('inside loadd');
    // alert(this.selectedEmployee.designation)
    console.log('Emp details in load ', event);
    if (event.isUserInput) {
      console.log('designation: ', employee.specialisation);
      this.sendNoteForm.controls['receiverId'].setValue(employee.employeeId);
      let name = employee.firstName + ' ' + employee.lastName;
      this.sendNoteForm.controls['receiverName'].setValue(name);

      this.sendNoteForm.controls['receiverSpecialisation'].setValue(
        employee.specialisation
      );
    }

    // this.designation = employee.specialisation;
  }

  attributeDisplay(employee1: Employee, employee2: Employee) {
    if (employee1.employeeId == employee2.employeeId) {
      return employee1.firstName + ' ' + employee1.lastName;
    } else {
      return '';
    }
  }

  sentNotesTabClick() {
    console.log('Tab clicked');
  }

  onTabClick(event: any) {
    console.log(event);
    console.log(event.tab.textLabel);

    if(event.index === 1){
      console.log("sent notes tab clicked");

   
    console.log("sender id: ", this.senderId);
    
    this.inboxService.getAllSentNote(this.senderId).subscribe(sentNotes =>{
      this.sentNotes = sentNotes;
      this.dataSourceSent.data = this.sentNotes
      console.log("Data source : " , this.dataSourceSent.data);     
    })
      
    }

    if (event.index === 2) {
      console.log('received notes tab clicked');

      this.receiverId = 1;
      console.log('receiver id: ', this.receiverId);

      this.inboxService
        .getAllReceivedNote(this.senderId)
        .subscribe((receivedNotes) => {
          this.receivedNote = receivedNotes;
          this.dataSourceReceived.data = this.receivedNote;
          console.log('Data source : ', this.dataSourceReceived.data);
        });
    }
  }

  sendReplyFromSentNotes(row: any) {
    console.log('Row data from sent notes: ', row);

    const dialogRef = this.dialog.open(ReplyNoteDialogComponent, {
      width: '250px',
      data: {name: "Priyanka"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });


  }
}
