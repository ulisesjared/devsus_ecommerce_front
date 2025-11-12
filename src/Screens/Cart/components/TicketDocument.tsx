import React from 'react'
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import type { ITicket } from '../common/interfaces';
import { formatCurrency, formatDate } from '../../../common/Constants/functions';
import RobotoBold from '../../../assets/fonts/Roboto-Bold.ttf';
import RobotoRegular from '../../../assets/fonts/Roboto-Regular.ttf';

interface ITicketDocument {
    data: ITicket | null
}

const PT_PER_IN = 72;
const CM_PER_IN = 2.54;
const ptFromCm = (cm: number) => (cm / CM_PER_IN) * PT_PER_IN;

const PAPER_WIDTH_CM = 4.8;
const PAPER_HEIGHT_CM = 7;

const TicketDocument: React.FC<ITicketDocument> = ({ data }) => {
    if (!data) {
        return (
            <Document>
                <Page size={{
                    width: ptFromCm(PAPER_WIDTH_CM),
                    height: ptFromCm(PAPER_HEIGHT_CM)
                }}>
                    <Text style={styles.empty}>Sin datos del ticket</Text>
                </Page>
            </Document>
        );
    }

    const subtotal =
        data.details?.reduce((acc, d) => {
            const lt =
                typeof d.line_total === 'number'
                    ? d.line_total
                    : (parseFloat(d.unit_price) || 0) * (d.quantity || 0);
            return acc + lt;
        }, 0) ?? 0;

    Font.register({
        family: 'Roboto',
        fonts: [
            { src: RobotoRegular, fontWeight: 'normal' }, // 400
            { src: RobotoBold, fontWeight: 'bold' }    // 700
        ]
    });
    return (
        <Document>
            <Page
                dpi={203}
                size={{
                    width: ptFromCm(PAPER_WIDTH_CM),
                    height: ptFromCm(PAPER_HEIGHT_CM)
                }}
            >
                <View style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>E-commerce</Text>
                        <View style={styles.subtitleWrap}>
                            <Text style={styles.subtitle}>Ticket de Venta</Text>
                            <Text style={styles.subtitle}>{data.id}</Text>
                        </View>
                    </View>

                    {/* Meta grid */}
                    <View style={styles.metaCol}>
                        <View style={styles.metaRow}>
                            <Text style={styles.metaLabel}>Fecha:</Text>
                            <Text style={styles.metaValue}>{formatDate({ data: data.created_at })}</Text>
                        </View>
                        {data.customer && <View style={styles.metaRow}>
                            <Text style={styles.metaLabel}>Cliente:</Text>
                            <Text style={styles.metaValue}>{data.customer}</Text>
                        </View>}
                        <View style={styles.metaRow}>
                            <Text style={styles.metaLabel}>Te atendió:</Text>
                            <Text style={styles.metaValue}>{data.driver}</Text>
                        </View>
                    </View>

                    {/* Details table */}
                    <View style={styles.table}>
                        {/* Header row (fixed for multi-page tables) */}
                        <View style={[styles.tr, styles.trHeader]} fixed>
                            <Text style={[styles.th, styles.colPresentation]}>Producto</Text>
                            <Text style={[styles.th, styles.colQty]}>Cant.</Text>
                            <Text style={[styles.th, styles.colUnit]}>Precio U.</Text>
                            <Text style={[styles.th, styles.colTotal]}>Importe</Text>
                        </View>

                        {data.details?.map((d, i) => {
                            const unit = parseFloat(d.unit_price) || 0;
                            const line = typeof d.line_total === 'number' ? d.line_total : unit * d.quantity;
                            return (
                                <View style={[styles.tr]} key={`${d.presentation}-${i}`}>
                                    <Text style={[styles.td, styles.colPresentation]}>{d.presentation}</Text>
                                    <Text style={[styles.td, styles.colQty]}>{d.quantity}</Text>
                                    <Text style={[styles.td, styles.colUnit]}>{formatCurrency(unit)}</Text>
                                    <Text style={[styles.td, styles.colTotal]}>{formatCurrency(line)}</Text>
                                </View>
                            );
                        })}
                    </View>

                    {/* Totals box (right aligned) */}
                    <View style={styles.totalsWrap}>
                        <View style={styles.totalsBox}>
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>Subtotal:</Text>
                                <Text style={styles.totalValue}>{formatCurrency(subtotal)}</Text>
                            </View>
                            {/* If you later add taxes/discounts, insert rows here */}
                            <View style={[styles.totalRow, styles.totalEmphasis]}>
                                <Text style={[styles.totalLabel, styles.totalEmphasisText]}>Total:</Text>
                                <Text style={[styles.totalValue, styles.totalEmphasisText]}>
                                    {formatCurrency(data.total)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

const styles = StyleSheet.create({
    base: { fontFamily: 'Roboto', fontSize: 11, lineHeight: 1.2 },
    th: { fontFamily: 'Roboto', fontSize: 11, fontWeight: 'bold' },
    td: { fontFamily: 'Roboto', fontSize: 11 },
    title: { fontFamily: 'Roboto', fontSize: 14, fontWeight: 'bold' },
    empty: {
        fontSize: 8,
        textAlign: 'center',
    },

    header: {
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 2,
        fontSize: 8,
        color: '#000',
        fontFamily: 'Roboto',
    },

    subtitleWrap: {
        marginTop: 8,
        flexDirection: 'column',
        alignItems: 'center',
    },

    metaGrid: {
        overflow: 'hidden',
        flexDirection: 'row',
    },
    metaCol: {
        width: '100%',
    },
    metaRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    metaLabel: {
        fontSize: 8,
        color: '#000',
        fontFamily: 'Roboto',
    },
    metaValue: {
        fontSize: 8,
        fontWeight: 400,
        textAlign: 'right',
        fontFamily: 'Roboto',
    },

    table: {
        overflow: 'hidden',
    },
    tr: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    trHeader: {
        color: '#000000',
    },
    trZebra: {
        backgroundColor: '#f9fafb',
    },
    colIdx: { width: '8%', textAlign: 'center' },
    colPresentation: { width: '45%', textAlign: 'center' },
    colQty: { width: '15%', textAlign: 'center' },
    colUnit: { width: '20%', textAlign: 'center' },
    colTotal: { width: '20%', textAlign: 'center' },

    totalsWrap: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    totalsBox: {
        width: '100%',
        overflow: 'hidden',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    totalLabel: {
        fontSize: 8,
        color: '#000',
        fontFamily: 'Roboto',
    },
    totalValue: {
        fontSize: 8,
        fontWeight: 400,
        fontFamily: 'Roboto',
    },
    totalEmphasis: {
        borderBottomWidth: 0,
    },
    totalEmphasisText: {
        color: '#000000',
    },

    footer: {
        position: 'absolute',
        left: 32,
        right: 32,
        bottom: 18,
        textAlign: 'center',
        color: '#000',
        fontSize: 8,
        fontFamily: 'Roboto',
    },
});


export default TicketDocument