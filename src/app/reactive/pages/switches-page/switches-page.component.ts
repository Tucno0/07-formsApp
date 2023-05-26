import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', [Validators.required]],
    wantNotifications: [true, Validators.required], //tiene que haver un valor seleccionado
    termsAndConditions: [true, Validators.requiredTrue], //tiene ser un valor verdadero
  });

  public person = {
    gender: 'F',
    wantNotifications: false
  }

  constructor( private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
        && this.myForm.controls[field].touched
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const {termsAndConditions, ...newPerson } = this.myForm.value; //Se excluye el termsAndConditions y se newPerson se queda con las demas valores

    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);
  }

}
