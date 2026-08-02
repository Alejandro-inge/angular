import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Decorador
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  
  //Propiedades (Estado)
  title = 'task-list';
  readonly userService = inject(UserService);

  //Contructor (solo inyectar dependencias)
  constructor(@Inject(inyeccion) public data: any) {
    console.log(data);
  }

  // Lifecycle Hooks para llamadas API
  ngOnInit() {
    this.userService.getUser(1).subscribe(
    ...
    );
  }

  //Métodos para eventos
  print() {
    console.log("Hello");
  }

}

