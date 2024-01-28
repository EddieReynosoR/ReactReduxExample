import { UserWithId, User } from "../../types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserId = string

const DEFAULT_STATE: UserWithId[] = [
    {
        id: "1",
        name: "Eduardo",
        email: "eduardo@gmail.com",
        github: "eddiereynosor"
    },
    {
        id: "2",
        name: "Gabo",
        email: "gabo@gmail.com",
        github: "gabito123"
    },
    {
        id: "3",
        name: "Pablo",
        email: "pablito@gmail.com",
        github: "pablo21"
    }
]

// Return inmediato
const initialState: UserWithId[] = (() => {
    const persistedState = localStorage.getItem("__redux__state__")
    if(persistedState) return JSON.parse(persistedState)?.users
    return DEFAULT_STATE
})()

export const usersSlice = createSlice({
    name: 'users', 
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            // return [...state, {id, ...action.payload}]
            state.push({id, ...action.payload})
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload
            return state.filter((user) => user.id !== id)
        }, 
        // Rollback en caso de que haya un error a la hora de eliminar un usuario
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            const isUserAlreadyDefined = state.find(user => user.id === action.payload.id)

            if(!isUserAlreadyDefined) {
                // return [...state, action.payload]
                state.push(action.payload)
            }
        }
    }
})

export default usersSlice.reducer // Reducer general

export const {deleteUserById, addNewUser, rollbackUser} = usersSlice.actions // Accion especifica