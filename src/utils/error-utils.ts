import {AppActionType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from '../api/todolists-api'

export const handleServerNetworkError = (dispatch:Dispatch<AppActionType>, message: string) => {

        dispatch(setAppErrorAC(message))
        dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T>(dispatch:Dispatch<AppActionType>, data: ResponseType<T>) => {
    if(data.messages.length){
        dispatch(setAppErrorAC(data.messages[0]))
        dispatch(setAppStatusAC('failed'))
    }else {
        dispatch(setAppErrorAC('Unknown error'))
    }
    dispatch(setAppStatusAC('failed'))
}
