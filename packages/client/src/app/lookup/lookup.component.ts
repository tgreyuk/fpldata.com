import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
})
export class LookupComponent implements OnInit {
  hasError = false;
  hasValidationErrors = false;
  lookupForm: FormGroup;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.lookupForm = new FormGroup({
      entryId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?:[1-9]\d*|\d)$/),
      ]),
    });
    if (this.router.url === '/error') {
      this.hasError = true;
    }
  }

  onSubmit(): void {
    if (this.lookupForm.status === 'VALID') {
      this.router.navigate([this.lookupForm.controls.entryId.value]);
    } else {
      this.hasValidationErrors = true;
    }
  }
}
