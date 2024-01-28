import { configureStore } from '@reduxjs/toolkit'
import { Middleware } from '@reduxjs/toolkit'
import usersReducer, {rollbackUser} from './users/slice'
import { toast } from 'sonner';


export const persistanceLocalStorageMiddleware: Middleware = store => next => action => {
    console.log(store.getState())
    console.log(action)
    next(action)
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()))
  };


  const syncWithDatabaseMiddleware: Middleware = store => next => action => {
    const {type, payload} = action;
    const previousState = store.getState();

    // fase 1. Antes del nuevo estado
    console.log({type, payload})
    console.log(store.getState())
    next(action)


    if(type === 'users/deleteUserById'){ // Eliminando usuario
        const userIdToRemove = payload
        const userToRemove = previousState.users.find(user => user.id === payload)
        fetch(`https://jsonplaceholder.typicode.com/users/${payload}`,
        {
            method: 'DELETE'
        })
        .then(res => {
            console.log('Success')
            if(res.ok) { 
                toast.success('User deleted successfully')
            }
        })
        .catch(err => {
            toast.error(`Error deleting user ${userIdToRemove}`)
            if(userToRemove) store.dispatch(rollbackUser(userToRemove))
            console.log(err)
        })
    }


    // fase 2. Nuevo Estado
  }

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
    .prepend(
        persistanceLocalStorageMiddleware,
        syncWithDatabaseMiddleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch