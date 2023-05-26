import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator {

  validate( control: AbstractControl ): Observable<ValidationErrors | null> {
    const email = control.value;

    const httCallObservable = new Observable<ValidationErrors | null>( ( subscriber ) => {
      console.log({email});

      if ( email === 'fernando@google.com') {
        subscriber.next({ emailTaken: true });
        subscriber.complete();
        return;
      }

      subscriber.next(null);
      subscriber.complete();
    }).pipe(
      delay(2000)
    );

    return httCallObservable;
  }


  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value;

  //   console.log({email});

  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay(2000)
  //   )
  // }

  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }

}

// return this.http.get<string>(`http://miservicio.com/users?q=${email}`)
//       .pipe(
//         map( resp => {
//           return ( resp.length === 0) ? null : { emailTaken: true}
//         })
//       );
