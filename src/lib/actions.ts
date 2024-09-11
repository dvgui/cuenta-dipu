import { Noticia } from '@/types/noticia';

('use server');
import { kv } from '@vercel/kv';

export async function cargarNoticias(): Promise<Noticia[]> {
    try {
        const noticias = await kv.hgetall('noticias');
        const noticiasArray = Object.values(noticias || {}) as Noticia[];
        return noticiasArray.sort(
            (a: Noticia, b: Noticia) =>
                new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
    } catch (error) {
        console.error('Error al cargar noticias:', error);
        return [];
    }
}

export async function guardarNoticia(noticia: Noticia) {
    try {
        await kv.hset('noticias', { [noticia.id]: noticia });
        return { success: true };
    } catch (error) {
        console.error('Error al guardar noticia:', error);
        return { success: false, error: 'Error al guardar la noticia' };
    }
}
