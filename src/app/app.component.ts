import { Component, OnInit } from '@angular/core';
import { SeriesService } from './series.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'seriesWorkspace';

  constructor(private seriesService: SeriesService) { 
    

  }

  ngOnInit() {
    
  }
}
