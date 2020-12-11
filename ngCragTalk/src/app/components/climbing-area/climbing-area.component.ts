import { ClimbingAreaService } from './../../services/climbing-area.service';
import { ClimbingArea } from './../../models/climbing-area';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-climbing-area',
  templateUrl: './climbing-area.component.html',
  styleUrls: ['./climbing-area.component.css']
})
export class ClimbingAreaComponent implements OnInit {


  climbingAreas: ClimbingArea[] = [];


  constructor(private datePipe: DatePipe,
    private eventService: EventService,
    private climbAreaService: ClimbingAreaService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router)  { }



    loadClimbEvents(): void{
      this.climbAreaService.index().subscribe(
        data=>{this.climbingAreas=data;
          console.log('Home.components loadClimbingArea(): retrieve succeeded');},
        err=>{
          console.error('Home.components loadClimbingArea(): retrieve failed');
          console.error(err);
        });
    }
  ngOnInit(): void {
    this.loadClimbEvents();
    console.log("in init");

  }

}