import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InboxModule } from 'src/app/inbox/inbox.module';
import { NotesComponent } from 'src/app/inbox/notes/notes.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute) { }
 
  inboxComponent!: NotesComponent;
  ngOnInit(): void {
  }

  loadInbox(){
    this.router.navigate(['"nurse/inbox/inbox'])
  }

}
