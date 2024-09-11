import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProgresoMandatoProps {
    progreso: number;
}

export default function ProgresoMandato({ progreso }: ProgresoMandatoProps) {
    return (
        <Card className="mt-8 bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-white">
                    Progreso del Mandato
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-900 bg-white">
                                Inicio del Mandato
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-900 bg-white">
                                Fin del Mandato
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                        <div
                            style={{ width: `${progreso}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                    </div>
                    <div
                        className="absolute top-full mt-1 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
                        style={{ left: `${progreso}%` }}
                    >
                        Usted está aquí
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
