import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withViewTransitions,
} from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { DemoService } from '../shared/demo-service';
import { OtherDemoService } from '../shared/other-demo-service';
import { OtherService } from '../shared/other-service';
import { routes } from './app.routes';
import { AuthStore } from '../shared/auth/stores/auth';
import { AuthApi } from '../shared/auth/services/auth-api';
import { AppErrorsStore } from '../shared/errors/stores/errors';

const otherServiceInstance = new OtherService('Hello, World!'); // this is eaten here.
export const appConfig: ApplicationConfig = {
  providers: [
    AuthStore,
    AuthApi,
    AppErrorsStore,
    [{ provide: DemoService, useClass: OtherDemoService }],
    [{ provide: OtherService, useValue: otherServiceInstance }], // One provider for this, now will be injectable everywhere.
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withViewTransitions(),
      withComponentInputBinding(),
    ),
    provideHttpClient(withFetch(), withInterceptors([])), // HttpClient
  ],
};

/* Providers Review

  If I just add to providers a type, like providers: [GolfStore],
  that is the same as saying providers: [{provide: GolfStore, useClass: GolfStore}]


  builder.Services.AddScoped<IDoGolfStoreSTuff, GolfStore>();

*/
