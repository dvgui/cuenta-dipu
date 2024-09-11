import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TiempoRestanteProps {
    diasRestantes: number;
    fechaFin: Date;
}

export default function TiempoRestante({
    diasRestantes,
    fechaFin,
}: TiempoRestanteProps) {
    return (
        <Card className="w-full col-span-2 bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-white">Tiempo Restante</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-6xl font-bold text-center text-white">
                    {diasRestantes} días
                </div>
                <p className="text-center mt-4 text-gray-400">
                    Hasta el {fechaFin.toLocaleDateString('es-ES')}
                </p>
            </CardContent>
        </Card>
    );
}
