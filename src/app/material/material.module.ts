import { NgModule } from '@angular/core';

import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list'; 
import { MatInputModule } from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon'; 
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatListModule} from '@angular/material/list'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { MatSidenavModule } from "@angular/material/sidenav";
import {MatToolbarModule} from '@angular/material/toolbar'; 

@NgModule({
    exports:[
    MatAutocompleteModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule
]
})
export class MaterialModule { }
