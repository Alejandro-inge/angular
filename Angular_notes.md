# Disección de Angular

Consta de:

- Componentes
- Servicios
- Guards
- Interceptores
- Pipes
- Directivas estructurales
- Formularios reactivos

## Componentes

Consta de:

1. Decorador
2. Clase
3. Plantilla
4. Estilo

### 1. Decorador (@Component) 

Es una función que recibe un objeto de configuración. Marca a un componente. 

- **selector**: nombre de la etiqueta HTML personalizada.

- **standalone**: indica que no necesita NgModule. 

- **imports**: se declaran directivas, pipes o componentes que se usan dentro del HTML. 

- **template / templateUrl**: template o archivo.

- **styles / stylesUrl**: template o archivo.

### 2. Clase TS (lógica)

Clase que exporta la lógica del negocio.

- **constructor**: para inyectar dependencias.
 
- **Propiedades**: variables, se enlazan a la vista (HTML). 

- **Métodos**: funciones que responden a eventos del usuario. 

- **Lifecycle Hooks**: métodos qué Angular ejecuta en momentos clave.


### 3. La Plantilla o vista (HTML)

- **Interpolación**: {{ propiedades }}

- **Property Binding**: [src]="imageUrl" para asignar atributos dinámicos. 

- **Event binding**: (click)="metodo()" para escuchar acciones del usuario. 

- **Control Flow**: @if, @for, @switch para estructurar la vista.

### 4. Estilos

Los estilos se encapsulan por lo que no afectan otras plantillas fuera del componente a menos que se use ::ng-deep. 
`

## Servicios

Su trabajo es la lógica de negocio, el acceso a datos (API) y el estado compartido entre componentes.

Consta de:

1. Decorador
2. Las Propiedades
3. El constructor
4. Los métodos públicos

### 1. El Decorador @Injectable (El contrato)

El decorador marca la clase como servicio inyectable.

- **providedIn**: 'root': Le dice a Angular que cree una instancia singleton para toda la aplicación. Asi, todos comparten la misma data y estado en memoria. Si se omite, se debera declarar en **providers** de un componente/módulo.

### 2. Las Propiedades (El estado interno)

Aqui se guardan datos, configuraciones o fuentes de datos reactivos.

- **Variables simples**

- **Subjects / BehaviorSubjects** (clave para estado reactivo). Ejemplo:

    Para mantener al usuario logueado y notificar cambios a toda la app.

        private userSubject = new BehaviorSubject<user | null>(null)

- **Instancias** de otros servicios inyectados o HttpClient.

### 3. El constructor (inyección de dependencias)

Su proposito es recibir las dependencias que el servicio necesita para funcionar.

- private http: HttpClient (para llamadas API).

- private router: Router (para navegación programática).

- Otros servicios personalizados.

### 4. Los Métodos Públicos (La API del Servicio)

Son las funciones que los componentes llaman para ejecutar acciones. Ejemplos:

- getUser(): http.get()

- createUser(): http.post()

- updateState(newData): Actualiza un BehaviorSubject para que todos los componentes suscritos se enteren al instante.

- handleError(error): Método privado para centralizar el manejo de errores.

## Guards

Son los guardianes de las rutas. Deciden si un usuario puede entrar o salir de una página y cuándo se recarga el código. En versiones modernas, los guars se escriben como funciones, no como clases.

Consta de:

1. La Firma.
2. La inyección de Dependencias.
3. La lógica y el retorno.

### 1. La Firma

1. **canActivate**: ¿Puede el usuario entrar a esta ruta?
2. **canActivateChild**: ¿Puede el usuario entrar a las rutas hijas?
3. **canDeactivate**: ¿Puede el usuario salir de esta ruta?
4. **canMatch** (reemplaza al canLoad): ¿Puede descargar el código lazy-loading? (Ej: evita descargar módulos pesados si no tiene rol?).

### 2. La inyección de Dependencias

No se usa constructor dado que no es una función. En su lugar, se usa la función inject() para obtener servicios como **Router**, **AuthService** o **ActivateRouteSnapshot**.

### 3. La lógica y el retorno

La función debe retornar:

- true: Deja pasar.
- false: Bloquea la navegación.
- UrlTree: Redirige a otra URL.
- También puede retornar un Observable<boolean | UrlTree> o Promise si se hacen llamadas asincronas.

## Interceptores

Los interceptores son el middleware de Angular para HTTP. Son los filtros para las peticione entrantes y salientes de una API.

Consta de:

1. La firma de la función.
2. Inyección de dependencias.
3. Clonación de la petición.
4. El pipeline de respuesta.

### 1. La firma de la función

- req: La petición saliente (HttpRequest). Es inmutable.
- next: El manejador (HttpResponse). Si no se llama a next.handle, la peticion muere sin llegar al servidor.

### 2. Inyección de dependecias

Dentro del body, se usa inject() para obtener servicios (Auth, Router, etc.), igual que en los guards.

### 3. Clonación de la petición

Para agregar headers, se debe clonar la petición req (inmutable).

### 4. El pipeline de respuesta

next.handle() devuelve un Obervable\<HttpEvent>. Aqui se aplica pipe() con operadores RxJS para:

- tap(): Para inspeccionar la respuesta sin modificarla (logging, refrescar token).
- catchError(): Para atrapar errores HTTP globalmente y redirigir al login.

## Pipes

Los pipes formatean la vista (Los datos). No tocan la lógica original.

Consta de :

- El decorador @Pipe
- La clase (o Función)
- El método
- Inyección de dependencias (Opcional).

### 1. El decorador @Pipe

Le indica a Angular que es un pipe.

- name: El indicador que se usa en el HTML (ej: {{ texto | mypipe }}). Debe ser unico.
- standalone: En Angular moderno se utiliza para importalo directamente en los componentes.
- pure: Define si el pipe se recálcula automaticamente o solo cuando la entrada cambia.

### 2. La clase (o Función)

Implementa la interfaz PipeTransform. Es una clase simple que contiene la lógica.

### 3. El método transfor(valor, ...args)

Es el corazón del pipe.

- Parámetro 1 (value): el dato de entrada.
- Parámetros adicionales (...args): Son los argumentos que se pasanen en el HTML separado por dos puntos (:).
- Retorno: Devuelve el dato ya transformado.

### 4. Inyección de dependencias (Opcional)

Un pipe puede usar inject() para acceder a servicios, pero se desaconseja para pipes puros, ya que se puede generar problemas de rendimiento. Si se necesita un servicio, usar un pipe impuro con mucha precaución.

