/*import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function titleValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const title: string = control.value;
    if (email === null || email === '') {
      return { errorMessage: 'This is required' };
    } else if (title.length < 5) {
      return { errorMessage: 'Minimum 5 chars needed' };
    } else if (!title.includes('$')) {
      return { errorMessage: 'Special sysbol is missing' };
    } else if (!title.includes('9')) {
      return { errorMessage: 'At lease one number needed' };
    } else {
      return null;
    }
  };
}
export function postValidator(): ValidatorFn {
  let fun1 = (form: AbstractControl): ValidationErrors | null => {
    let title: string = form.get('title')?.value;
    let description: string = form.get('description')?.value;
    let imagePath: string = form.get('imagePath')?.value;
    if (title === null || title === '') {
      return { errorMessage: 'Title is missing' };
    } else if (title.length < 5) {
      return { errorMessage: 'Title min length is 5' };
    } else if (description === null || description === '') {
      return { errorMessage: 'Descriotion is missing' };
    } else {
      return null;
    }
  };
  return fun1;
}*/