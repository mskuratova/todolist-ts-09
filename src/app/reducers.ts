// мы задаём структуру нашего единственного объекта-состояния
import {combineReducers} from 'redux'
import {appReducer} from '../features/Application'
import {authReducer} from '../features/Auth'
import {tasksReducer, todolistsReducer} from '../features/TodolistsList'
import {call, put} from 'redux-saga/effects'
import {setIsLoggedIn} from "../features/Auth/auth-reducer";
import {authAPI} from "../api/todolists-api";

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer
})
export function* initializeAppWorkerSaga() {
    const res = yield  call(authAPI.me)
    if (res.data.resultCode === 0) {
        yield put(setIsLoggedIn({value: true}))
    } else {
    }
}