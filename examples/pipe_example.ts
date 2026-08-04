import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
    standalone: true,
    pure: true
})

export class TruncatePipe implements PipeTransform {
    // value es el texto a acortar
    // limit es el número máximo de caracteres
    // trail es el texto que se añadirá al final si se corta
    transform(value: string, limit: number = 10, trail: string = '...'): string {
        if (!value) return '';
        if (value.length <= limit) return value;
        return value.substring(0, limit) + trail;         
    }
}


//uso: <p>{{ 'Este es un texto muy largo que necesita ser acortado' | truncate:5:'***' }}</p>
