import { Component, OnInit, Inject } from '@angular/core';
import { SeriesService } from './series.service';
import { AuthorizationService } from './services/authorization.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { DialogComponent } from './views/dialog/dialog.component';
import { SpinnerComponent } from './views/spinner/spinner.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'seriesWorkspace';
  searchLabel = 'Big Mouth';
  actualLanguage = 'eng';
  season='1';
  episode='1';
  displayedColumns: string[] = ['Name', 'downloadsNo','View', 'Download','Open'];
  spinnerRef=null;

  dataSource=[{
                downloadLink: "https://dl.opensubtitles.org/en/download/src-api/vrf-19f40c62/sid-pqvKkEt9CAxPhqmQ0cTC6d5zu23/file/1955695854.gz",
                downloadsNo: 7487,
                encoding: "UTF-8",
                fileName: "Big.Mouth.S01E01.WEBRip.x264-RARBG.English.srt",
                format: "srt",
                id: 7114694,
                language: "English",
                osLink: "http://www.opensubtitles.org/en/subtitles/7114694/sid-pqvKkEt9CAxPhqmQ0cTC6d5zu23/big-mouth-ejaculation-en",
                subtitleFileId: 1955695854
              }];

  constructor(private seriesService: SeriesService, private authorizationService: AuthorizationService, public dialog: MatDialog) { 
    

  }

  ngOnInit() {
    
  }
  doSearch(){
    this.openDialog();
    this.seriesService.searchSubtitle(this.searchLabel,this.season, this.episode, this.actualLanguage)
      .subscribe(subtitles => {
        this.dataSource = subtitles;
        this.closeDialog();
      });
  }

  downloadFile(element){
    console.log(element)

    if(element!=null){
      this.seriesService.downloadFile2(element.subtitleFileId,element.fileName);
    }
    
  }

  openPopup (element): void {
    console.log(element)
    this.openDialog();
    this.seriesService.downloadSubtitle(element.subtitleFileId)
      .subscribe(subtitle => {
        console.log(subtitle);

        element.subtitle=subtitle;
        const dialogConfig = new MatDialogConfig();
        
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data=element;
        const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          
        });

        this.closeDialog();

      },
      error => {
        this.closeDialog();
    });
  }
  openDialog(){
    const dialogConfig = new MatDialogConfig();
        
    dialogConfig.disableClose = true;
    
    this.spinnerRef = this.dialog.open(SpinnerComponent, dialogConfig);
  }

  closeDialog(){
    this.spinnerRef.close();
  }
}