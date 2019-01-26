import { Injectable, HttpService } from "@nestjs/common";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";

@Injectable()
export class GeocoderService {
  url = 'https://maps.googleapis.com/maps/api/geocode';
  format = 'json';
  key = 'AIzaSyDJ3xMYDRkdSoSpIERsYylJWqmv3D-rpXs';

  constructor(private readonly httpService: HttpService) {}

  async getAddress(lat: number, lng: number): Promise<string> {
    const url = `${this.url}/${this.format}?latlng=${lat},${lng}&key=${this.key}`;
    return '';
  //  return this.httpService.get(url).pipe(res => { const address = res.data.results[0].formatted_address; return '' } ).toPromise();
  }
}