import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class GoogleMapsService {
  private readonly geocoderApi =
    'https://maps.googleapis.com/maps/api/geocode/json';
  private readonly staticApi = 'https://maps.googleapis.com/maps/api/staticmap';
  private readonly key = 'AIzaSyDJ3xMYDRkdSoSpIERsYylJWqmv3D-rpXs';
  private readonly zoom = 19;
  private readonly width = 600;
  private readonly height = 600;

  constructor(private readonly httpService: HttpService) {}

  getMapUrl(lat: number, lon: number): string {
    return `${this.staticApi}?center=${lat},${lon}&zoom=${this.zoom}&size=${
      this.width
    }x${this.height}&key=${this.key}`;
  }

  async getAddress(lat: number, lon: number): Promise<string | null> {
    const url = `${this.geocoderApi}?latlng=${lat},${lon}&key=${this.key}`;
    const response = await this.httpService.get(url).toPromise();
    const data = response.data ? response.data : null;
    const results = data ? data.results : null;
    const result = results && results.length > 0 ? results[0] : null;
    const address = result ? result.formatted_address : null;
    return address;
  }
}
