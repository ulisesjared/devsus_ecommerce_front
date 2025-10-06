import type { ReportsProps } from './common/interfaces'
import useReports from './hooks/ReportsProvider'
import LoadingPage from '../../common/Components/Pages/LoadingPage'
import Table from '../../common/Components/Tables/Table'
import type { Column } from '../../common/Components/Tables/TableInterface'
import { formatCurrency, formatDateTime } from '../../common/Constants/functions'

const HistoryTab = ({ startDate, endDate }: ReportsProps) => {

    const { reports, reportsStatus } = useReports({ startDate, endDate })

    if (reportsStatus === 'pending') return <LoadingPage message="Cargando reportes..." />

    if (!reports || reports.length === 0) return <></>

    const COLUMNS: Column[] = [
        { label: "Fecha", atr: "created_at", Component: (data) => formatDateTime(data) },
        { label: "Cliente", atr: "customer", Component: ({data}) => data ?? '--' },
        { label: "Repartidor", atr: "driver", Component: ({data}) => data ?? '--' },
        { label: "Total", atr: "total", Component: ({ data }) => formatCurrency(data) },
    ]

    return (
        <Table
            theme="light"
            loadingMessage='Cargando reportes'
            noDataMessage='No hay reportes disponibles'
            data={reports}
            columns={COLUMNS}
            searchKeys={['customer', 'driver']}
        />
    )
}

export default HistoryTab