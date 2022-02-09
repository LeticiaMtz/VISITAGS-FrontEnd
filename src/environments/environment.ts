// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  urlGlobal: 'https://seguimiento-tutoral.api.fs.utags.edu.mx/api',
  production: true,

  nuevo:       '5f186c5de9475240bc59e4a7',
  seguimiento: '5f186c7ee9475240bc59e4a9',
  cerrado:     '5f186c70e9475240bc59e4a8',
  finalizado:  '5f21d37f0d1bcb4608b3ea86',

  roles: {
    administrador: '5f1e2419ad1ebd0b08edab74',
    coordinador: '5eeee0db16952756482d186a',
    director: '5eeee0db16952756482d1869',
    profesor: '5eeee0db16952756482d1868'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
