export type RequestStatusType ='idle' | 'loading' | 'succeeded' | 'failed'

const initialState ={
    status: 'idle' as RequestStatusType,
    error: 'ERROR' as string | null
}
type InitialStateType = typeof initialState

export const appReduser =(state: InitialStateType = initialState, action:  AppActionType):InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS' :
            return {...state, status: action.status}
        case "APP/ERROR-STATUS":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/ERROR-STATUS', error} as const)



export type  SetAppStatusActionType= ReturnType<typeof setAppStatusAC>;
export type  SetAppErrorActionType= ReturnType<typeof setAppErrorAC>;
export type AppActionType = SetAppStatusActionType | SetAppErrorActionType