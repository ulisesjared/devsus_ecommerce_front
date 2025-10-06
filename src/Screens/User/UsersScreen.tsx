import useUsers from './hooks/UsersProvider'
import type { Column } from '../../common/Components/Tables/TableInterface'
import type { User } from '../../common/Interfaces/UserInterface'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../common/Components/Pages/PageHeader'
import AddButton from '../../common/Components/Buttons/AddButton'
import Table from '../../common/Components/Tables/Table'

const UsersScreen = () => {

    const { users, usersStatus } = useUsers({})

    const navigate = useNavigate()

    const COLUMNS: Column[] = [
        { label: "Correo", atr: "email", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
        { label: "Rol", atr: "role", Component: (data) => <div className='w-full total-center'>{data.data}</div> },
    ]

    const SEARCH_KEYS: (keyof User)[] = ["id", "email", "first_name", "last_name"];

    return (
        <div className='flex flex-col flex-1 gap-2 p-2'>
            <PageHeader title="Usuarios" />
            <div className='flex flex-row gap-2'>
                <AddButton
                    onClick={() => navigate('/usuarios/nuevo')}
                    label="Nuevo"
                    className="px-4 py-2" />
            </div>
            <Table
                theme="light"
                loadingMessage='Cargando usuarios'
                noDataMessage='No hay usuarios disponibles'
                data={users ?? []}
                columns={COLUMNS}
                searchKeys={SEARCH_KEYS}
                loading={usersStatus === 'pending'}
                handleRowClick={(item) => navigate(`/usuarios/${item.id}`)}
            />
        </div>
    )
}

export default UsersScreen