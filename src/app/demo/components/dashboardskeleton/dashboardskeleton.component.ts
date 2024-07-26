import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboardskeleton',
  templateUrl: './dashboardskeleton.component.html',
  styleUrls: ['./dashboardskeleton.component.scss']
})
export class DashboardskeletonComponent implements OnInit {

  items = Array(9).fill(0);

  constructor() { }

  ngOnInit(): void {
  }

}
