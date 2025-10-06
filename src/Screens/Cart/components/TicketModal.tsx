import React, { useEffect, useState } from 'react'
import GenericModal from '../../../common/Components/Modals/GenericModal'
import { pdf } from '@react-pdf/renderer';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';
import { printPlugin } from '@react-pdf-viewer/print';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import TicketDocument from './TicketDocument';
import type { ITicket } from '../common/interfaces';

import { setPdfJsWorker, pdfFirstPageToPrinterPng } from '../../../common/Constants/pdfToPrinterPng'

interface ITicketModal {
    ticketData: ITicket | null
    visible: boolean
    close: () => void
}

const PRINTER_WIDTH_PX = 384;

const DEFAULT_SETTINGS = {
    "widthPx": PRINTER_WIDTH_PX,
    "mm": 58,
    "dpi": 203,
    "density": 3
}

const TicketModal: React.FC<ITicketModal> = ({ ticketData, visible, close }) => {
    const [pdfUrl, setPdfUrl] = useState<string>("");
    const [pngBlob, setPngBlob] = useState<Blob | null>(null);

    const printPluginInstance = printPlugin();
    const { print } = printPluginInstance;

    useEffect(() => {
        setPdfJsWorker(workerUrl); // inicializa pdf.js una sola vez
    }, []);

    /**
     * TODO
     * - Revisar documentacion de printPlugin para quitar timestamp, appname, host, page del pdf.
     * - Investigar por que aparece una pagina en blanco al imprimir.
     */
    useEffect(() => {
        let revoke: string | undefined;
        (async () => {
            if (!ticketData) return;
            const pdfBlob = await pdf(<TicketDocument data={ticketData} />).toBlob();
            const objectUrl = URL.createObjectURL(pdfBlob);
            setPdfUrl(objectUrl);
            revoke = objectUrl;
            const png = await pdfFirstPageToPrinterPng(pdfBlob, PRINTER_WIDTH_PX);
            setPngBlob(png);
        })();
        return () => {
            if (revoke) {
                URL.revokeObjectURL(revoke);
            }
            setPngBlob(null);
        };
    }, [ticketData]);

    // const handleShareOrDownloadPng = async () => {
    //     if (!pngBlob) return;
    //     const file = new File([pngBlob], 'ticket.png', { type: 'image/png' });

    //     // 1) Si estás en Android (PWA o navegador compatible), intenta compartir al helper nativo
    //     // (tu app DantSu puede exponerse como destino de "Compartir")
    //     // Puedes pasar settings en "text" o con intent:// si haces integración más fina.
    //     if (navigator.canShare?.({ files: [file] })) {
    //         try {
    //             await navigator.share({
    //                 title: 'Ticket',
    //                 text: JSON.stringify({
    //                     widthPx: PRINTER_WIDTH_PX,
    //                     mm: 58,
    //                     dpi: 203,
    //                     density: 3,
    //                     // mac: '00:11:22:33:44:55' // si lo manejas desde tu app
    //                 }),
    //                 files: [file],
    //             });
    //             return;
    //         } catch (e) {
    //             console.error(e);
    //             // cae a descarga
    //         }
    //     }

    //     // 2) Fallback: descargar el PNG
    //     const url = URL.createObjectURL(pngBlob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'ticket.png';
    //     a.click();
    //     URL.revokeObjectURL(url);
    // };

    async function shareToAndroid(pngBlob: Blob, settings: any) {
        const file = new File([pngBlob], 'ticket.png', { type: 'image/png' });
        // canShare → check rápido
        if (navigator.canShare?.({ files: [file] })) {
            await navigator.share({
                title: 'Ticket',
                text: JSON.stringify(settings),   // la app lo lee en EXTRA_TEXT
                files: [file],
            });
        } else {
            // Fallback: descarga; el usuario abre “Compartir” → elige tu app
            const url = URL.createObjectURL(pngBlob);
            const a = document.createElement('a');
            a.href = url; a.download = 'ticket.png'; a.click();
            URL.revokeObjectURL(url);
        }
    }

    return (
        <GenericModal
            fullScreen
            visible={visible}
            close={close}
            title='Venta realizada exitosamente'
            content={<div className='flex-1 relative overflow-y-scroll fancy-scroll'>
                <div className='absolute w-full py-2'>
                    {pdfUrl && <Worker workerUrl={workerUrl}>
                        <Viewer fileUrl={pdfUrl} plugins={[printPluginInstance]} />
                    </Worker>}
                </div>
            </div>}
            actions={[
                {
                    label: 'Imprimir',
                    onClick: () => {
                        print()
                        // close()
                    },
                    style: 'action'
                },
                {
                    label: 'Imprimir (PNG nítido)',
                    onClick: () => shareToAndroid(pngBlob!, DEFAULT_SETTINGS),
                    style: 'action'
                },
            ]}
        />
    )
}

export default TicketModal