export function calcularDiasRestantes(fechaFin: Date): number {
    const ahora = new Date();
    const diferencia = fechaFin.getTime() - ahora.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
}

export function calcularProgreso(fechaInicio: Date, fechaFin: Date): number {
    const ahora = new Date();
    const duracionTotal = fechaFin.getTime() - fechaInicio.getTime();
    const tiempoTranscurrido = ahora.getTime() - fechaInicio.getTime();
    return (tiempoTranscurrido / duracionTotal) * 100;
}

export function convertirImagenABase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
