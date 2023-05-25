import { Component } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  // public myForm2 = new FormGroup({
  //   favoriteGames: new FormArray([])
  // })

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],

    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl( '' , [Validators.required, Validators.minLength(3)]);

  constructor( private fb: FormBuilder ) { }

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
        && this.myForm.controls[field].touched;
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
        && formArray.controls[index].touched;
  }

  getFieldError( field: string ): string | null {
    if (!this.myForm.controls[field]) return null; // si el formulario no tiene el campo

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Este campo debe tener al menos ${ errors['minlength'].requiredLength } caracteres`;
        // case 'min':
        //   return 'El valor mínimo es 0';
        // default:
        //   return 'Error desconocido';
      }
    }

    return null;
  }

  onAddToFavorites(): void {
    if( this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    // this.favoriteGames.push( new FormControl( newFavorite, [Validators.required]))
    this.favoriteGames.push(this.fb.control( newGame, Validators.required));

    // resetemos el newGame
    this.newFavorite.reset();
  }

  onDeleteFavorite( index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    // Reseteamos el favoriteGames
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);

    this.myForm.reset();
  }






  // Practica =========================================================

  public practicaForm: FormGroup = this.fb.group({
    nombre: [ , [Validators.required, Validators.minLength(3)]],

    juegosFavoritos: this.fb.array([
      ['GTA V', Validators.required],
      ['Red death reedption 2', Validators.required],
      ['The Witcher 3', Validators.required],
    ])
  })

  get juegosFavoritos() {
    return this.practicaForm.get('juegosFavoritos') as FormArray
  }

  esValidoElCampo(campo: string): boolean | null {
    return this.practicaForm.controls[campo].errors
        && this.practicaForm.controls[campo].touched
  }

  esValidoCampoEnArreglo( formArray: FormArray, indice: number) {
    return formArray.controls[indice].errors
        && formArray.controls[indice].touched;
  }

  obtenerErrorCampo(campo: string): string | null {
    if( !this.practicaForm.controls[campo]) return null;

    const errores = this.practicaForm.controls[campo].errors || {};

    for (const error of Object.keys(errores)) {
      switch (error) {
        case 'required':
          return 'Este campo es requerido';
          case 'minlength':
          return `Este campo debe tener al menos ${ errores['minlength'].requiredLength } caracteres`;
      }
    }

    return null;
  }

  onEliminar(index: number): void {
    this.juegosFavoritos.removeAt(index);
  }

  onGuardar(): void {
    if (this.practicaForm.invalid) {
      this.practicaForm.markAllAsTouched();
      return;
    }

    console.log(this.practicaForm.value);

    this.practicaForm.reset();
  }

}
