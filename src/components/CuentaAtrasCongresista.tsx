'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import TiempoRestante from './TiempoRestante';
import ProgresoMandato from './ProgresoMandato';
import NoticiasEventos from './NoticiasEventos';
import AgregarHito from './AgregarHito';
import Compartir from './Compartir';
import { cargarNoticias } from '@/lib/actions';
import { calcularDiasRestantes, calcularProgreso } from '@/lib/utils';
import { Noticia } from '@/types/noticia';

export default function CuentaAtrasCongresista() {
    const noticiaTemp: Noticia = {
        id: 'temp',
        descripcion: 'No hizo nada',
        url: '',
        imagen: '',
        fecha: Date.now().toString(),
    };
    const [diasRestantes, setDiasRestantes] = useState(0);
    const [fechaInicio] = useState(new Date('2021-12-10'));
    const [fechaFin] = useState(new Date('2025-12-10'));
    const [enviado, setEnviado] = useState(false);
    const [progreso, setProgreso] = useState(0);
    const [noticias, setNoticias] = useState([noticiaTemp]);

    useEffect(() => {
        const actualizarTiempo = () => {
            setDiasRestantes(calcularDiasRestantes(fechaFin));
            setProgreso(calcularProgreso(fechaInicio, fechaFin));
        };

        actualizarTiempo();
        const intervalo = setInterval(actualizarTiempo, 1000);

        cargarNoticiasDesdeServidor();

        return () => clearInterval(intervalo);
    }, [fechaFin, fechaInicio]);

    const cargarNoticiasDesdeServidor = async () => {
        try {
            const noticiasServidor: Noticia[] = await cargarNoticias();
            setNoticias(noticiasServidor);
        } catch (error) {
            console.error('Error al cargar noticias:', error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-8 text-white">
                    Días que quedan hasta que Martín Tetaz no sea más Diputado
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <TiempoRestante
                        diasRestantes={diasRestantes}
                        fechaFin={fechaFin}
                    />
                    <Card className="w-full bg-gray-900 border-gray-800">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Mart%C3%ADn_Alberto_Tetaz.png"
                            alt="Martín Tetaz"
                            className="w-full h-auto rounded-lg"
                        />
                    </Card>
                </div>

                <ProgresoMandato progreso={progreso} />
                <NoticiasEventos noticias={noticias} />
                <AgregarHito
                    onHitoAgregado={cargarNoticiasDesdeServidor}
                    setEnviado={setEnviado}
                />
                <Compartir diasRestantes={diasRestantes} />

                {enviado && (
                    <Alert className="mt-4 bg-green-900 border-green-800 text-white">
                        <AlertTitle>Éxito</AlertTitle>
                        <AlertDescription>
                            Tu hito ha sido enviado y está pendiente de
                            aprobación por un administrador.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
}
