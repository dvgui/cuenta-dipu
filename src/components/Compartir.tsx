import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CompartirProps {
    diasRestantes: number;
}

export default function Compartir({ diasRestantes }: CompartirProps) {
    const compartir = () => {
        const url = `https://chau-tetaz.vercel.app/`;
        const texto = `Días que quedan hasta que Martín Tetaz no sea más Diputado: ${diasRestantes}`;

        const compartirEnX = () => {
            window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    texto
                )}&url=${encodeURIComponent(url)}`,
                '_blank'
            );
        };

        const compartirEnWhatsApp = () => {
            window.open(
                `https://wa.me/?text=${encodeURIComponent(texto + ' ' + url)}`,
                '_blank'
            );
        };

        const compartirEnTelegram = () => {
            window.open(
                `https://t.me/share/url?url=${encodeURIComponent(
                    url
                )}&text=${encodeURIComponent(texto)}`,
                '_blank'
            );
        };

        const copiarURL = () => {
            navigator.clipboard.writeText(url).then(() => {
                alert('URL copiada al portapapeles');
            });
        };

        return (
            <div className="-m-1 flex flex-wrap flex-row items-center">
                <Button
                    onClick={compartirEnX}
                    className="m-1 bg-blue-400 hover:bg-blue-500"
                >
                    X (Twitter)
                </Button>
                <Button
                    onClick={compartirEnWhatsApp}
                    className="m-1 bg-green-500 hover:bg-green-600"
                >
                    WhatsApp
                </Button>
                <Button
                    onClick={compartirEnTelegram}
                    className="m-1 bg-blue-500 hover:bg-blue-600"
                >
                    Telegram
                </Button>
                <Button
                    onClick={copiarURL}
                    className="m-1 bg-gray-500 hover:bg-gray-600"
                >
                    Copiar URL
                </Button>
            </div>
        );
    };

    return (
        <Card className="mt-8 bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-white">Compartir</CardTitle>
            </CardHeader>
            <CardContent>{compartir()}</CardContent>
        </Card>
    );
}
