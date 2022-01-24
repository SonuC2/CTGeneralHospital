import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inbox } from 'src/app/entities/inbox';
import { InboxService } from 'src/app/services/inbox.service';

@Component({
  selector: 'app-reply-note-dialog',
  templateUrl: './reply-note-dialog.component.html',
  styleUrls: ['./reply-note-dialog.component.css']
})
export class ReplyNoteDialogComponent implements OnInit {

  sendNoteForm!: any;
  constructor( public dialogRef: MatDialogRef<ReplyNoteDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: Inbox,private inboxService: InboxService) { }

  ngOnInit(): void {
    console.log("receivername from ts: ",this.data.receiverName);
    
  }

  sendNote(sendNoteForm:any) {

    
    this.sendNoteForm.controls['senderId'].setValue(this.data.senderId);
      // let name = employee.firstName + " " + employee.lastName
      this.sendNoteForm.controls['senderName'].setValue(this.data.senderName);
      this.sendNoteForm.controls['senderSpecialisation'].setValue(this.data.senderSpecialisation);
      console.log("form: ",this.sendNoteForm.value);
    this.inboxService.sendNote(this.sendNoteForm.value).subscribe();
    
    this.sendNoteForm.reset();
    console.log('note is sent');
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}

