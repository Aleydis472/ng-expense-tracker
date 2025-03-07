import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment.development';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(),
  provideCharts(withDefaultRegisterables()),
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideFirestore(() => getFirestore()),
  provideAuth(() => getAuth()),
  importProvidersFrom(NgxSpinnerModule.forRoot()),
  provideAnimations()
  ]
};
