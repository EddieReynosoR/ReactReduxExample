import { UserId, deleteUserById, addNewUser} from "../store/users/slice"
import {  User } from "../types/types"
import { useAppDispatch } from "./store"


export const useUserActions = () => {
    const dispatch = useAppDispatch()

    const removeUser = (id:UserId) => {
        dispatch(deleteUserById(id))
    }

    const addUser = (user: User) => {
        dispatch(addNewUser(user))
    }


    return {removeUser, addUser}
}