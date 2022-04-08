// мы задаём структуру нашего единственного объекта-состояния
import {combineReducers} from 'redux'
import {appReducer} from '../features/Application'
import {authReducer} from '../features/Auth'
import {tasksReducer, todolistsReducer} from '../features/TodolistsList'
import {call, put} from 'redux-saga/effects';
import {takeEvery} from 'redux-saga/effects'
import {setIsLoggedIn} from "../features/Auth/auth-reducer";
import {authAPI} from "../api/todolists-api";
// объединяя reducer-ы с помощью combineReducers,
// непосредственно создаём store
//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
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