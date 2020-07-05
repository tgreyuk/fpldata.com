import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LookupComponent } from './lookup.component';

@NgModule({
  declarations: [LookupComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class LookupModule {}
