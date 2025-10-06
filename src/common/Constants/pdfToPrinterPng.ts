import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// Si ya importas el worker con ?url, pásalo desde fuera a esta función o setéalo 1 vez.
export function setPdfJsWorker(workerUrl: string) {
    GlobalWorkerOptions.workerSrc = workerUrl;
}

/**
 * Convierte la primera página de un PDF (Blob/ArrayBuffer) a PNG con ancho exacto
 * (384 px en 58mm, 576 px en 80mm). Incluye downscale HQ y dithering Bayer 4x4.
 */
export async function pdfFirstPageToPrinterPng(
    pdfInput: Blob | ArrayBuffer,
    targetWidthPx: number // 384 (58mm) o 576 (80mm)
): Promise<Blob> {
    const data = pdfInput instanceof Blob ? await pdfInput.arrayBuffer() : pdfInput;

    const pdf = await getDocument({ data }).promise;
    const page = await pdf.getPage(1);

    // Render a alta resolución para luego bajar con buena calidad
    const viewport = page.getViewport({ scale: 2 });
    const c1 = document.createElement('canvas');
    c1.width = Math.floor(viewport.width);
    c1.height = Math.floor(viewport.height);
    const ctx1 = c1.getContext('2d')!;

    await page.render({ canvasContext: ctx1, viewport }).promise;

    // Escalar a ancho exacto del cabezal
    const scale = targetWidthPx / c1.width;
    const c2 = document.createElement('canvas');
    c2.width = targetWidthPx;
    c2.height = Math.floor(c1.height * scale);
    const ctx2 = c2.getContext('2d', { willReadFrequently: true })!;
    ctx2.imageSmoothingEnabled = true; // HQ downscale
    ctx2.drawImage(c1, 0, 0, c2.width, c2.height);

    // Dithering ordenado Bayer 4x4 (a 1-bit "simulado" sobre RGBA)
    const img = ctx2.getImageData(0, 0, c2.width, c2.height);
    const bayer = [
        [1, 9, 3, 11],
        [13, 5, 15, 7],
        [4, 12, 2, 10],
        [16, 8, 14, 6],
    ];
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            const i = (y * img.width + x) * 4;
            const r = img.data[i],
                g = img.data[i + 1],
                b = img.data[i + 2];
            // luminancia aproximada
            const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            const t = (bayer[y & 3][x & 3] / 17) * 255; // 0..255
            const v = lum < t ? 0 : 255;
            img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
            img.data[i + 3] = 255;
        }
    }
    ctx2.putImageData(img, 0, 0);

    // Exportar PNG
    const blob: Blob = await new Promise((res) =>
        c2.toBlob((b) => res(b!), 'image/png')
    );
    return blob;
}