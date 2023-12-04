import {AbstractControl} from "@angular/forms";

export const stringMatch = (controlName1: string, controlName2: string) => {
  return (group: AbstractControl) => {
    const str1 = group.get(controlName1).value;
    const str2 = group.get(controlName2).value;
    return str1 === str2 ? null : {notSame: true};
  }
}
