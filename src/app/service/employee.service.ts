import { inject, Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Employee} from "../model/employee";
import { collection, collectionData, Firestore, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private firestore: Firestore = inject(Firestore);

  get $(): Observable<Employee[]> {

    const employees$ = collection(this.firestore, 'employees');
    return collectionData(employees$) as Observable<Employee[]>;
  }

  addEmployee(employee: Employee) {
    const employees$ = collection(this.firestore, 'employees');
    delete employee.id;
    // @ts-ignore
    return addDoc(employees$, JSON.parse(JSON.stringify(employee)));
  }
}
