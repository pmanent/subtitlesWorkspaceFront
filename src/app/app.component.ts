import { Component, OnInit, Input } from '@angular/core';
import { SeriesService } from './series.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'seriesWorkspace';
  searchLabel = '';
  actualLanguage = 'eng';
  season='';
  episode='';
  displayedColumns: string[] = ['Name', 'View', 'Download'];

  dataSource=[];

  constructor(private seriesService: SeriesService) { 
    

  }

  ngOnInit() {
    
  }
  doSearch(){
    
    this.seriesService.searchSubtitle(this.searchLabel,this.season, this.episode, this.actualLanguage)
      .subscribe(subtitles => this.dataSource = subtitles);
  }

  downloadFile(element){
    console.log(element)

    if(element!=null){
      this.seriesService.downloadFile2(element.subtitleFileId,element.fileName);
    }
    
  }
}
