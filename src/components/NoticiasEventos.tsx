import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Noticia } from '@/types/noticia';

interface NoticiasEventosProps {
    noticias: Noticia[];
}

export default function NoticiasEventos({ noticias }: NoticiasEventosProps) {
    return (
        <Card className="mt-8 bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-white">Noticias y Eventos</CardTitle>
            </CardHeader>
            <CardContent>
                {noticias.length > 0 ? (
                    <div className="space-y-4">
                        {noticias.map((noticia) => (
                            <div
                                key={noticia.id}
                                className="border-b border-gray-800 pb-4"
                            >
                                <h3 className="font-semibold text-white">
                                    {new Date(noticia.fecha).toLocaleDateString(
                                        'es-ES'
                                    )}
                                </h3>
                                <p className="text-gray-300">
                                    {noticia.descripcion}
                                </p>
                                <a
                                    href={noticia.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline"
                                >
                                    Ver más
                                </a>
                                {noticia.imagen && (
                                    <img
                                        src={noticia.imagen}
                                        alt="Imagen de la noticia"
                                        className="mt-2 max-w-full h-auto rounded-lg"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-gray-300">
                            Hoy, como todo el mandato, no hizo nada.
                        </p>
                        <img
                            src="/placeholder.svg?height=200&width=200&text=Tumbleweed"
                            alt="Bola de pasto en el desierto"
                            className="mx-auto mt-4"
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
