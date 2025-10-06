import DateRangePicker from '../../common/Components/Inputs/DateRangePicker'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ScreenTabs from '../../common/Navigation/ScreenTabs/ScreenTabs'
import ReportsTab from './ReportsTab'
import HistoryTab from './HistoryTab'


const DashBoardScreen = () => {

    const formik = useFormik({
        initialValues: {
            startDate: new Date(),
            endDate: new Date(),
        },
        validationSchema: Yup.object({
            startDate: Yup.date().required('Fecha Inicial es requerida'),
            endDate: Yup.date().required('Fecha Final es requerida'),
        }),
        onSubmit: (values) => {
            console.log(values)
        },
    })

    return (
        <div className='flex flex-1 flex-col gap-2 p-2'>
            <div className='flex card'>
                <DateRangePicker formik={formik} startId="startDate" endId="endDate" />
            </div>
            <ScreenTabs
                selected='reportes'
                basePath='/reportes'
                tabs={[
                    {
                        label: 'Reportes',
                        component: <ReportsTab {...formik.values} />,
                        value: 'reportes'
                    },
                    {
                        label: 'Historial de ventas',
                        component: <HistoryTab {...formik.values} />,
                        value: 'historial'
                    },
                ]}
            />
        </div>
    )
}

export default DashBoardScreen