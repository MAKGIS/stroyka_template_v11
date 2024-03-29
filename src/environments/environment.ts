// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    //pimalionCloudUrl: 'https://demo.sourcing.pm/backend'// 'http://pimsoushasvr01.dev.pimalion.cloud'
    //pimalionCloudUrl: 'http://localhost:44363'// 'http://pimsoushasvr01.dev.pimalion.cloud'
    pimalionCloudUrl: 'https://demo.sourcing.pm/backend', // 'http://pimsoushasvr01.dev.pimalion.cloud'
    //pimalionCloudUrl: 'http://localhost:44363'// 'http://pimsoushasvr01.dev.pimalion.cloud'
    //pimalionCloudUrl: 'https://pim.socoda.fr:4343/pimalion_socoda_staging_api'// 'http://pimsoushasvr01.dev.pimalion.cloud'
    modeApp:  'demo.sourcing.pm' //  'fake-server'; 'json'; 'demo.sourcing.pm'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
