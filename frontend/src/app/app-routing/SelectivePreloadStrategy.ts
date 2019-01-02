import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

export class SelectivePreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    if (route.data && route.data.preload) {
      console.log('preload ' + route.path);
      return load();
    }
    return of(null);
  }
}

