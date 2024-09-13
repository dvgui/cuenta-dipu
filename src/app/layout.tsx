import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'Días que quedan hasta que Martín Tetaz no sea más Diputado',
    description:
        'Sitio que cuenta la cantidad de días hasta que saquemos al inutil de Martín Tetaz del Congreso',
    openGraph: {
        title: 'Días que quedan hasta que Martín Tetaz no sea más Diputado',
        description:
            'Sitio que cuenta la cantidad de días hasta que saquemos al inutil de Martín Tetaz del Congreso',
        url: 'https://tetaz.guidito.com.ar',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body
                className={`${geistSans.variable} ${geistMono.variable} md:px-[20%]`}
            >
                {children}
            </body>
        </html>
    );
}
