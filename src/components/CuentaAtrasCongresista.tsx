'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import TiempoRestante from './TiempoRestante';
import ProgresoMandato from './ProgresoMandato';
import Compartir from './Compartir';
import { calcularDiasRestantes, calcularProgreso } from '@/lib/utils';
import { toZonedTime } from 'date-fns-tz';

const timeZone = 'America/Argentina/Buenos_Aires';

export default function CuentaAtrasCongresista() {
    const [diasRestantes, setDiasRestantes] = useState(0);
    const [fechaInicio] = useState(
        toZonedTime(new Date('2021-12-10'), timeZone)
    );
    const [fechaFin] = useState(toZonedTime(new Date('2025-12-10'), timeZone));
    const [progreso, setProgreso] = useState(0);

    useEffect(() => {
        const actualizarTiempo = () => {
            setDiasRestantes(calcularDiasRestantes(fechaFin));
            setProgreso(calcularProgreso(fechaInicio, fechaFin));
        };

        actualizarTiempo();
        const intervalo = setInterval(actualizarTiempo, 1000);

        return () => clearInterval(intervalo);
    }, [fechaFin, fechaInicio]);

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

                <Compartir diasRestantes={diasRestantes} />
            </div>
        </div>
    );
}
