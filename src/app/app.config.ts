import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { interceptor, RequestsInterceptor } from './common/interceptors/requests.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withComponentInputBinding()), 
    provideClientHydration(), provideHttpClient(withFetch(), 
    withInterceptors([interceptor])), provideAnimations()]
};
