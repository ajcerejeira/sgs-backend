import { Injectable, HttpService } from '@nestjs/common';
import { GeoJSON, FeatureCollection, Feature, Point } from 'geojson';
const carRotations = require('../../../data/carRotations.json');

@Injectable()
export class GoogleMapsService {
  private readonly geocoderApi =
    'https://maps.googleapis.com/maps/api/geocode/json';
  private readonly staticApi = 'https://maps.googleapis.com/maps/api/staticmap';
  private readonly googlUrl = 'https://www.googleapis.com/urlshortener/v1/url';
  private readonly googlKey = 'AIzaSyDKc2OgSaAmZX59vVNlAtO2hjuFLpTLdiI';
  private readonly key = 'AIzaSyDJ3xMYDRkdSoSpIERsYylJWqmv3D-rpXs';
  private readonly zoom = 19;
  private readonly width = 600;
  private readonly height = 600;
  private readonly carUrl =
    'https://raw.githubusercontent.com/ajcerejeira/sgs-backend/master/public/img/car-rotation/carroCroqui';
  private readonly icons = {
    crosswalk: 'https://i.imgur.com/0hRN1Bk.png',
    forbidden: 'https://i.imgur.com/PZXoGqF.png',
    oneWay: 'https://i.imgur.com/jfAiQbC.png',
    stop: 'https://i.imgur.com/IaV9sET.png',
    trafficLight: 'https://i.imgur.com/O6pmAEL.png',
    yield: 'https://i.imgur.com/XWrYVnj.png',
  };

  constructor(private readonly httpService: HttpService) {}

  getMapUrl(
    centerLat: number,
    centerLon: number,
    featureCollection?: FeatureCollection,
  ): string {
    const features = featureCollection ? featureCollection.features : [];
    const markers = features.map(
        feature => {
          const [lat, lon] = (feature.geometry as Point).coordinates;
          const icon = feature.properties.type === 'car'
            ? carRotations[feature.properties.rotation]
            : this.icons[feature.properties.type];
          return `&markers=anchor:topright%7Cicon:${icon}%7C${lat},${lon}`;
        }).join('');
    return `${this.staticApi}?center=${centerLat},${centerLon}&zoom=${
      this.zoom
    }&size=${this.width}x${this.height}${markers}&key=${this.key}`;
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
