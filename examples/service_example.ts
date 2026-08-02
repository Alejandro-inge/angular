import { Injectable } from '@angular/core';
import { Httplient } from ...;
import { BehaviorSubject, Observable, catchError, tap, throwErro } from ...;


//Interface ejemplo para recibir tareas

export interface Task {
  id: number;
  title: String;
  content: String;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  //Propiedades estado interno
  private apiUrl = 'https://myapi.com/tasks'
  //BehavioraSubject guarda el ultimo valor emitido
  private tasksSubject = new BehaviorSubject<User[]>([]);
  //Exposición de observable para que los consumidores se suscriban readonly
  public tasks$: Observable<[]> this.tasksSubject.asObservable();

  //Constructor para inyecciones
  constructor(private http: HttpClient) { 
    
  }

  //Métodos públicos
  loadUsers(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl.pipe(
      tap((tasks)) => {
        this.tasksSubject.next(tasks);
      }),catchError((error) => {
        console.log(error);
        return throwError(() => new Error("Fallo al cargar tareas"));  
      })
    );
   }

  getCurrentTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  }
