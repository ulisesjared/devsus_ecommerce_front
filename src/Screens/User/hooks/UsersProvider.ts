import useGeneric from '../../../common/hooks/Generic'
import type { IUser } from '../common/interfaces'

const useUsers = ({ id }: { id?: string }) => {

    const {
        list, listStatus,
        retrieve, retrieveStatus,
        create, createStatus,
        update, updateStatus,
        delete: deleteUser, deleteStatus,
    } = useGeneric<IUser>({
        apiUrl: 'user',
        module: 'usuario',
        listQueryKey: 'users',
        retrieveQueryKey: 'user',
        redirectUrl: 'usuarios',
        objectId: id
    })

    return ({
        users: list,
        usersStatus: listStatus,
        user: retrieve,
        userStatus: retrieveStatus,
        createUser: create,
        createUserStatus: createStatus,
        updateUser: update,
        updateUserStatus: updateStatus,
        deleteUser: deleteUser,
        deleteUserStatus: deleteStatus,
    })
}

export default useUsers