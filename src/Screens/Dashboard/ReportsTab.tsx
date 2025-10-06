import type { ReportsProps } from './common/interfaces'
import useReports from './hooks/ReportsProvider'
import { Chart } from "react-google-charts";
import { buildByCustomerAmount, buildByDriverAmount, buildByPresentationAmount } from './common/helpers';
import LoadingPage from '../../common/Components/Pages/LoadingPage';

// options for a horizontal BarChart
const barOptions = (title: string) => ({
    title,
    legend: { position: "none" },
    bars: "horizontal" as const,        // (Material charts) ignored by Classic BarChart but harmless
    chartArea: { left: 120, right: 24, top: 48, bottom: 24 },
    hAxis: { minValue: 0 },
    annotations: { alwaysOutside: true },
});

const ReportsTab = ({ startDate, endDate }: ReportsProps) => {

    const { reports, reportsStatus } = useReports({ startDate, endDate })

    if (reportsStatus === 'pending') return <LoadingPage message="Cargando reportes..." />

    if (!reports || reports.length === 0) return <></>


    const byPresentation = buildByPresentationAmount(reports);
    const byDriver = buildByDriverAmount(reports);
    const byCustomer = buildByCustomerAmount(reports);

    return (
        <div className='flex flex-1 relative rounded-b-md bg-white overflow-y-scroll fancy-scroll shadow-md'>
            <div className="absolute w-full padding-x flex flex-col py-4 gap-8">
                <Chart
                    chartType="BarChart"
                    width="98%"
                    height="400px"
                    data={byPresentation}
                    options={barOptions("Ventas por producto (MXN)")}
                    loader={<div>Loading…</div>}
                />
                <Chart
                    chartType="BarChart"
                    width="98%"
                    height="280px"
                    data={byDriver}
                    options={barOptions("Ventas por repartidor (MXN)")}
                    loader={<div>Loading…</div>}
                />
                <Chart
                    chartType="BarChart"
                    width="98%"
                    height="360px"
                    data={byCustomer}
                    options={barOptions("Ventas por cliente (MXN)")}
                    loader={<div>Loading…</div>}
                />
            </div>
        </div>
    )
}

export default ReportsTab