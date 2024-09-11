'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageIcon } from 'lucide-react';
import { guardarNoticia } from '@/lib/actions';
import { convertirImagenABase64 } from '@/lib/utils';

interface AgregarHitoProps {
    onHitoAgregado: () => void;
    setEnviado: (enviado: boolean) => void;
}

export default function AgregarHito({
    onHitoAgregado,
    setEnviado,
}: AgregarHitoProps) {
    const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const nuevaNoticia = {
                id: Date.now().toString(),
                descripcion: data.descripcion,
                url: data.url,
                imagen: archivoSeleccionado
                    ? await convertirImagenABase64(archivoSeleccionado)
                    : null,
                fecha: new Date().toISOString(),
            };

            const resultado = await guardarNoticia(nuevaNoticia);

            if (resultado.success) {
                setEnviado(true);
                reset();
                setArchivoSeleccionado(null);
                onHitoAgregado();
                setTimeout(() => setEnviado(false), 5000);
            } else {
                console.error('Error al guardar la noticia:', resultado.error);
            }
        } catch (error) {
            console.error('Error al enviar el hito:', error);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setArchivoSeleccionado(file);
        }
    };

    return (
        <Card className="mt-8 bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-white">Agregar un Hito</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Textarea
                            placeholder="Describe el hito..."
                            {...register('descripcion', {
                                required: 'Este campo es obligatorio',
                            })}
                            className="bg-gray-800 text-white border-gray-700 focus:border-blue-500"
                        />
                        {errors.descripcion && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.descripcion.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Input
                            type="url"
                            placeholder="URL de la noticia"
                            {...register('url', {
                                required: 'La URL es obligatoria',
                                pattern: {
                                    value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                                    message: 'Ingresa una URL válida',
                                },
                            })}
                            className="bg-gray-800 text-white border-gray-700 focus:border-blue-500"
                        />
                        {errors.url && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.url.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                        >
                            <ImageIcon className="w-4 h-4 mr-2" />
                            <span>Subir Imagen</span>
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        {archivoSeleccionado && (
                            <p className="mt-2 text-sm text-gray-300">
                                Archivo seleccionado: {archivoSeleccionado.name}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        Enviar Hito
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
