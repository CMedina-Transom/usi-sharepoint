import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { SharepointIntegrationService } from 'shared-lib';
import { MainTableDataSource } from '../datasources/main-table.datasource';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainTableService {
  dataSource: MainTableDataSource;

  constructor(
    private sis: SharepointIntegrationService
  ) {
    this.dataSource = new MainTableDataSource();
  }

  clearAll() {
    this.dataSource.clearAll();
  }
  loadData() {
    const data = {
      select: ['Id','Title','TieneIdYoutube','Idvideo','Enlace',
                'Descripcion','PalabrasClave','Fecha','Orden',
                'TieneImagen','Imagen','Created'],
      top: 5000
    };

    const datePipe = new DatePipe('en-US');

    return this.sis.read(environment.sharepoint.listname, data)
      .pipe(
        map((response: any) => {
          return response.value.map(r => {
            const item: any = {
              created: new Date(r.Created),
              id: r.Id,
              title: r.Title,
              idLinkR: r.TieneIdYoutube ? 'id' : 'link',
              idYoutube: r.Idvideo,
              link: r.Enlace,
              description: r.Descripcion,
              keywords: r.PalabrasClave,
              date: new Date(r.Fecha),
              order: r.Orden,
              imageVideoR: r.TieneImagen ? 'image' : 'video',
              image: r.Imagen ?  {data:r.Imagen, name:'Image', type:'image/png'} : null
            };

            item.createdLabel = datePipe.transform(item.created, 'yyyy-MM-dd hh:mm a');

            return item;
          });
        }),
        tap((response: any) => {
          this.dataSource.replaceAll(response);
        })
      );
  }


}
