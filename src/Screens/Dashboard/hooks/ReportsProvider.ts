import { useQuery } from '@tanstack/react-query'
import { setDayTime } from '../../../common/Constants/functions'
import type { ReportsProps } from '../common/interfaces'
import { myAxios } from '../../../common/hooks/useAxios'

const useReports = ({ startDate, endDate }: ReportsProps) => {

    const {
        data: reports,
        status: reportsStatus
    } = useQuery({
        queryKey: ['reports', startDate, endDate],
        queryFn: async () => {

            const start = setDayTime(new Date(startDate), 'start')
            const end = setDayTime(new Date(endDate), 'end')

            const res = await myAxios.get('order/reports', {
                params: {
                    startDate: start.toISOString(),
                    endDate: end.toISOString()
                }
            })
            return res.data
        },
        enabled: !!startDate && !!endDate
    })

    return ({
        reports,
        reportsStatus
    })
}

export default useReports