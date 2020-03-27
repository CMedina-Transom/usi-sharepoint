import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { FormsService,SharepointIntegrationService, ImageUploadControlComponent } from 'shared-lib';
import { environment } from '../../../../environments/environment';
import { MainTableService } from '../../../services/main-table.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'mvs-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {
  /*countries = [
    {label: 'Canada', value: [
      {label: 'Montreal', value: 'Mon' },
      { label: 'Quebec', value: 'Que?'}
    ] },
    {label: 'México', value: [
      {label: 'San Luis Potosi', value:'SLP'},
      {label: 'Queretaro', value:'QRO'},
    ] },
    {label: 'Estados Unidos', value:[
      {label: 'Arizona', value:'AZ'},
      {label: 'Ohio', value:'OH'},
    ]},
  ];*/
  @Input() data: any;
  @ViewChild('image') iucc: ImageUploadControlComponent;
  flags = {
    loadingFields: true
  };
  //keywords =[];
  //image = null;
  //keywords: string[] = [];
  //readonly separatorKeysCodes: number[] = [ ENTER, COMMA ];

  private isNew: boolean;
  mainForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fs: FormsService,
    private mts: MainTableService,
    private sis: SharepointIntegrationService
  ) { }

  ngOnInit() {
    this.isNew = this.data ? false : true;

    this.setupForm();
    //this.stateCtrl.disable();

    //Event listener
    //se aconseja que se ponga el signo de pesos para indicar que se hace ref a un observable
    const refIdLinkR$ = this.idLinkRCtrl.valueChanges.subscribe( response=> {
      if(this.idLinkRCtrl.value == 'id'){
        this.idYoutubeCtrl.setValidators([Validators.required]);
        this.idYoutubeCtrl.updateValueAndValidity();
        this.linkCtrl.setValidators(null);
        this.linkCtrl.updateValueAndValidity();
      }
      else if(this.idLinkRCtrl.value == 'link'){
        this.linkCtrl.setValidators([Validators.required]);
        this.linkCtrl.updateValueAndValidity();
        this.idYoutubeCtrl.setValidators(null);
        this.idYoutubeCtrl.updateValueAndValidity();
      }
    });

    const imageVideoR$ = this.imageVideoRCtrl.valueChanges.subscribe( response=> {

      if(this.imageVideoRCtrl.value == 'video'){
        this.imageCtrl.setValidators(null);
        this.imageCtrl.updateValueAndValidity();
      }
      else if(this.imageVideoRCtrl.value == 'image'){
        this.imageCtrl.setValidators([Validators.required]);
        this.imageCtrl.updateValueAndValidity();
      }
    });
    //const ref$ = this.countryCtrl.valueChanges.subscribe(response => {
      //this.stateCtrl.enable();
      //ref$.unsubscribe();
    //});
  }

  // Custom public methods

  disableFields() {
    this.fs.disableFields(this.mainForm);
  }

  enableFields() {
    this.fs.enableFields(this.mainForm);
  }

  submit() {
    const values = this.mainForm.value;
    console.log(values);

    const data: any = {
      __metadata: environment.sharepoint.metadata,
      Title: values.title,
      TieneIdYoutube:  (values.idLinkR == 'id') ? true: false,
      Idvideo:  values.idYoutube,
      Enlace:  (values.idLinkR == 'id') ? ("https://www.youtube.com/watch?v=" + values.idYoutube) : values.link,
      Descripcion:  values.description,
      PalabrasClave:  values.keywords ? values.keywords.keywords : null,
      Fecha:  values.date.toISOString(),
      Orden:  values.order,
      TieneImagen:  (values.imageVideoR == 'image') ? true : false ,
      Imagen:  values.image ? values.image.data : undefined

    };

    if (values.id) {
      data.Id = values.id;
    }

    this.validateOrder(values.order, values.id);
    return this.sis.getFormDigest().pipe(
      switchMap(formDigest => {
        return this.sis.save(environment.sharepoint.listname, data, formDigest);
      })
    );
  }

  // Custom private methods

  private setupForm() {
    this.mainForm = this.fb.group({
      id:null,
      title: [null, Validators.required],
      idLinkR: ['id', Validators.required],
      idYoutube: [null, [Validators.required, Validators.pattern(/^[\da-zA-Z_-]{11}$/)]],
      link: null,
      description: null,
      keywords: null,
      date:[null, Validators.required],
      order: [null, [Validators.required, Validators.max(1000000), Validators.min(1), Validators.pattern(/^\d{1,7}$/)]],
      imageVideoR: 'video',
      image: null
      //example
      //email: [null, [Validators.required, Validators.email] ], //el primer campo es el valor por defecto, el segundo los validadores
      //rfc: [null, [Validators.required, Validators.pattern(/^[a-zA-Z]{4}\d{6}$/)] ],
      //gender: null,
      //country:[null, Validators.required],
      //state:[null, Validators.required]
    });
    console.log("el data");
    console.log(this.data);
    if (!this.isNew) {
      this.mainForm.patchValue({
        id: this.data.id,
        title: this.data.title,
        idLinkR: this.data.idLinkR,
        idYoutube: this.data.idYoutube,
        link: this.data.link,
        description: this.data.description,
        keywords: this.data.keywords ? {keywords: this.data.keywords}: null,
        //keywords:{keywords: ['123','234','345']},
        date: this.data.date,
        order: this.data.order,
        imageVideoR: this.data.imageVideoR,
        image: this.data.image
        //image: {name:'qwqwe', type:'asdasd', data:'sdffgd'}
      });
      //this.image = this.data.image;

      //this.keywords = this.data.keywords ? this.data.keywords.split(',') : [];


    }
    /*
    this.mainForm.patchValue({
      image: {
        data: '',
        name: 'el nombre que pinche quieres',
        type: 'image/png'
      }
    });*/
    console.log('el main form');
    console.log(this.mainForm);
  }

  //Getter and setters
  get idLinkRCtrl(){
    return this.mainForm.get('idLinkR');
  }
  get idYoutubeCtrl(){
    return this.mainForm.get('idYoutube');
  }
  get linkCtrl(){
    return this.mainForm.get('link');
  }
  get orderCtrl(){
    return this.mainForm.get('order');
  }
  get imageVideoRCtrl(){
    return this.mainForm.get('imageVideoR');
  }
  get imageCtrl(){
    return this.mainForm.get('image');
  }
  validateOrder(ord, id) {
    const data = {
      select: ['Id', 'Orden'],
      filter:['Orden eq ' + ord, 'Id ne ' + id],
      top:1
    };

    this.sis.read(environment.sharepoint.listname, data)
    .subscribe((response: any) => {
      if(response.value.length > 0)
      {
        const data: any = {
          __metadata: environment.sharepoint.metadata,
          Id: response.value[0].Id,
          Orden: response.value[0].Orden + 1
        };
        this.sis.getFormDigest().pipe(
          switchMap(formDigest => {
            return this.sis.save(environment.sharepoint.listname, data, formDigest);
          })
        ).subscribe(() => {
          this.validateOrder(data.Orden,data.Id);
          this.mts.loadData().subscribe();
        },);
      }
    });
  }
/*
  addKeyword(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.keywords.push(value.trim());
      this.mainForm.markAsDirty();

    }
    if (input) {
      input.value = '';
    }
  }
  removeKeyword(keyword: any) {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
    this.mainForm.markAsDirty();
  }*/
}
