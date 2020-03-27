//import { Component } from '@angular/core';
import { Component, OnInit, Input,AfterViewInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { FormsService,SharepointIntegrationService, ImageUploadControlComponent } from 'shared-lib';
import { environment } from '../environments/environment';
//import { MainTableService } from '../../../services/main-table.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgbModule, NgbCarousel,NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { MainFormDialogComponent } from './components/dialogs/main-form-dialog/main-form-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  object: string;
}

@Component({
  selector: 'mvswp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
//export class AppComponent {
export class AppComponent implements AfterViewInit{
  object: any;
  constructor(
    private fb: FormBuilder,
    private fs: FormsService,
    //private mts: MainTableService,
    private sis: SharepointIntegrationService,
    public dialog: MatDialog
  ) { }
  title = 'mainVideo-webpart';
  mostrarTodos = false;
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  videoList = [ ];
  @ViewChild('carousel') carousel: NgbCarousel;
  ngAfterViewInit() {
    this.carousel.pause();
  }
  ngOnInit() {

// this.videoList = [
//       {
//         Id: "1",
//         Title: "Ampliacion de brazo Distribuidor",
//         Enlace: "https://www.youtube.com/embed/7om13wupyGQ",
//         Descripcion: "valgo del distribuidor",
//         Fecha: "2020-03-31T06:00:00.000Z",
//         TieneImagen: false,
//         Imagen: ""

//       },
//       {
//         Id: "2",
//         Title: "Conoce XILITLA... un lugar maravilloso!",
//         Enlace: "https://www.youtube.com/embed/c59y0O_Gyn8",
//         Descripcion: "es un video de xilitla",
//         Fecha: "2020-03-21T06:00:00.000Z",
//         TieneImagen: true,
//         Imagen: ""

//       },
//       {
//         Id: "2",
//         Title: "Conoce XILITLA... un lugar maravilloso!",
//         Enlace: "https://www.youtube.com/embed/c59y0O_Gyn8",
//         Descripcion: "es un video de xilitla",
//         Fecha: "2020-03-21T06:00:00.000Z",
//         TieneImagen: true,
//         Imagen: ""
//       },
//       {
//         Id: "3",
//         Title: "Cambia tus armas por juguetes",
//         Enlace: "https://www.youtube.com/embed/0eA5zx7Zjss",
//         Descripcion: "texto explicativo de armas y bla bla bla",
//         Fecha: "2020-03-17T06:00:00.000Z",
//         TieneImagen: false,
//         Imagen: ""
//       },
//       {
//         Id: "3",
//         Title: "Cambia tus armas por juguetes",
//         Enlace: "https://www.youtube.com/embed/0eA5zx7Zjss",
//         Descripcion: "texto explicativo de armas y bla bla bla",
//         Fecha: "2020-03-17T06:00:00.000Z",
//         TieneImagen: false,
//         Imagen: ""
//       },
//       {
//         Id: "4",
//         Title: "un video que quiero promocionar",
//         Enlace: "https://www.youtube.com/embed/aYDTXaLWEvs",
//         Descripcion: "texto explicativo de un video que quiero promocionar y bla bla bla",
//         Fecha: "2020-03-27T06:00:00.000Z",
//         TieneImagen: false,
//         Imagen: ""
//       },
//       {
//         Id: "4",
//         Title: "un video que quiero promocionar",
//         Enlace: "https://www.youtube.com/embed/aYDTXaLWEvs",
//         Descripcion: "texto explicativo de un video que quiero promocionar y bla bla bla",
//         Fecha: "2020-03-27T06:00:00.000Z",
//         TieneImagen: false,
//         Imagen: ""
//       },
//       {
//         Id: "1",
//         Title: "Ampliacion de brazo Distribuidor",
//         Enlace: "https://www.youtube.com/embed/7om13wupyGQ",
//         Descripcion: "valgo del distribuidor",
//         Fecha: "2020-03-31T06:00:00.000Z",
//         TieneImagen: false,
//         Imagen: ""
//       }
//     ];

    // this.videoList = [
    //   {
    //     video1:{
    //       id: "1",
    //       title: "Ampliacion de brazo Distribuidor",
    //       link: "https://www.youtube.com/embed/7om13wupyGQ",
    //       description: "valgo del distribuidor",
    //       date: "2020-03-31T06:00:00.000Z",
    //       hasImage: false,
    //       image: "",
    //       exist: true
    //     },
    //     video2:{
    //       id: "2",
    //       title: "Conoce XILITLA... un lugar maravilloso!",
    //       link: "https://www.youtube.com/embed/c59y0O_Gyn8",
    //       description: "es un video de xilitla",
    //       date: "2020-03-21T06:00:00.000Z",
    //       hasImage: true,
    //       image: "",
    //       exist: true
    //     }
    //   },
    //   {
    //     video1:{
    //       id: "2",
    //       title: "Conoce XILITLA... un lugar maravilloso!",
    //       link: "https://www.youtube.com/embed/c59y0O_Gyn8",
    //       description: "es un video de xilitla",
    //       date: "2020-03-21T06:00:00.000Z",
    //       hasImage: true,
    //       image: "",
    //       exist: true
    //     },
    //     video2:{
    //       id: "3",
    //       title: "Cambia tus armas por juguetes",
    //       link: "https://www.youtube.com/embed/0eA5zx7Zjss",
    //       description: "texto explicativo de armas y bla bla bla",
    //       date: "2020-03-17T06:00:00.000Z",
    //       hasImage: false,
    //       image: "",
    //       exist: true
    //     }
    //   },
    //   {
    //     video1:{
    //       id: "3",
    //       title: "Cambia tus armas por juguetes",
    //       link: "https://www.youtube.com/embed/0eA5zx7Zjss",
    //       description: "texto explicativo de armas y bla bla bla",
    //       date: "2020-03-17T06:00:00.000Z",
    //       hasImage: false,
    //       image: "",
    //       exist: true
    //     },
    //     video2:{
    //       id: "4",
    //       title: "un video que quiero promocionar",
    //       link: "https://www.youtube.com/embed/aYDTXaLWEvs",
    //       description: "texto explicativo de un video que quiero promocionar y bla bla bla",
    //       date: "2020-03-27T06:00:00.000Z",
    //       hasImage: false,
    //       image: "",
    //       exist: true
    //     }
    //   },
    //   {
    //     video1:{
    //       id: "4",
    //       title: "un video que quiero promocionar",
    //       link: "https://www.youtube.com/embed/aYDTXaLWEvs",
    //       description: "texto explicativo de un video que quiero promocionar y bla bla bla",
    //       date: "2020-03-27T06:00:00.000Z",
    //       hasImage: false,
    //       image: "",
    //       exist: true
    //     },
    //     video2:{
    //       id: "1",
    //       title: "Ampliacion de brazo Distribuidor",
    //       link: "https://www.youtube.com/embed/7om13wupyGQ",
    //       description: "valgo del distribuidor",
    //       date: "2020-03-31T06:00:00.000Z",
    //       hasImage: false,
    //       image: "",
    //       exist: true
    //     }
    //   }
    // ];



    const data2 = {
      select: ['Id','Lista', 'MostrarTodos'],
      filter: ['Lista eq \'MainVideos\''],
      top: 1
    };
    this.sis.read('Global', data2)
    .subscribe((response: any) => {
      console.log(response);
      if(response.value.length > 0) {
        this.mostrarTodos = response.value[0].MostrarTodos;
      }
    });

    const data = {
      select: ['Id','Title','TieneIdYoutube','Idvideo','Enlace',
                'Descripcion','PalabrasClave','Fecha','Orden',
                'TieneImagen','Imagen','Created'],
      top: 5000,
      orderBy: 'Orden'
    };


    this.sis.read(environment.sharepoint.listname, data)
    .subscribe((response: any) => {
      let dataVideo;

      if(response.value.length > 0) {
        console.log(response);
        for(var i = 0; i < response.value.length; i++){
          var carouselItem = {};
          var v2 = {exist: false};
          if( i <= response.value.length - 2 )//es el último y no es el primero
            v2 = this.createVideoItem(response.value[i+1]);
          else if( i != 0)
            v2 = this.createVideoItem(response.value[0]);

          carouselItem = {
            video1: this.createVideoItem(response.value[i]),
            video2: v2
          };
          this.videoList.push(carouselItem);
        }
        console.log(this.videoList);

      }
    });




    //de aqui abajo es lo del otroweb part
    // const data = {
    //     select: ['Id','Title','TieneIdYoutube','Idvideo','Enlace',
    //               'Descripcion','PalabrasClave','Fecha','Orden',
    //               'TieneImagen','Imagen','Created'],
    //     top: 5000,
    //     orderBy: 'Orden'
    //   };
    //   this.sis.read(environment.sharepoint.listname, data)
    //   .subscribe((response: any) => {

    //     if(response.value.length > 0) {
    //       this.videoList = response.value;
    //       var link = "";
    //       for(var i = 0; this.videoList.length; i++){
    //         link = "";
    //         if(this.videoList[i].Enlace.indexOf('youtube') != -1){
    //           var url = this.videoList[i].Enlace.split("=");
    //           link = 'https://www.youtube.com/embed/' + url[url.length-1];
    //         this.videoList[i].Enlace = link;
    // }
    //       }
    //     }
    //   });

  }

  openDialog(video): void {
    const dialogRef = this.dialog.open(MainFormDialogComponent, {
      width: '1050px',
      data: { object: video }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.object = result;
    });
  }

  createVideoItem(item){
    var link = "";
    if(item.Enlace.indexOf('youtube') != -1){
      var url = item.Enlace.split("=");
      link = 'https://www.youtube.com/embed/' + url[url.length-1];
    }
    else
      link = item.Enlace;

    return {
      id: item.Id,
      title: item.Title,
      link: link,
      description: item.Descripcion,
      date: item.Fecha,
      hasImage: item.TieneImagen,
      image: item.Imagen,
      exist: true
    }
  }


}




