import { HttpService, Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import * as humps from 'humps';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entry } from './interfaces/entry.interface';

@Injectable()
export class DataLoaderService {
  constructor(private httpService: HttpService) {}

  get dataLoader(): any {
    return new DataLoader(keys =>
      Promise.all(
        keys.map((key: string) =>
          this.httpService
            .get(key)
            .pipe(map(response => humps.camelizeKeys(response.data))),
        ),
      ),
    );
  }

  entryLoader(id: number) {
    return this.dataLoader.load(`entry/${id}/`) as Promise<Observable<Entry>>;
  }
}
