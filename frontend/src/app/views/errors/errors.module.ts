import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { LogoModule } from '@app/shared/components/logo/logo.module';
import { ErrorsRoutingModule } from './errors-routing.module';

import { Error1Component } from './error-1/error-1.component';
import { Error504Component } from './error-504/error-504.component';

@NgModule({
    declarations: [
        Error1Component,
        Error504Component
    ],
    imports: [
        ErrorsRoutingModule,
        SharedModule,
        LogoModule,
    ],
    exports: [],
    providers: [],
})
export class ErrorsModule {}
