import {NgModule} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";

const Material = [
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatDividerModule,
  MatSelectModule,
  MatOptionModule
];

@NgModule({
  imports: [Material],
  exports: [Material]
})

export class MaterialModule {}
