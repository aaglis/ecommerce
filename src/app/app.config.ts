import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { Box, ChevronRight, LogOut, LucideAngularModule, User, UserCog, ShoppingCart, X } from 'lucide-angular';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(localePt)

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick({ User, Box, LogOut, ChevronRight, UserCog, ShoppingCart, X })),
    [{provide: LOCALE_ID, useValue: 'pt-BR'}],
    provideEnvironmentNgxMask(), provideAnimationsAsync()
  ]
};
