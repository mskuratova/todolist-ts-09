import thunkMiddleware from 'redux-thunk'
import {configureStore} from '@reduxjs/toolkit'
import {initializeAppWorkerSaga, rootReducer} from './reducers'
import createSagaMiddleware from 'redux-saga'
import {takeEvery} from 'redux-saga/effects'
import {fetchTasksWorkerSaga} from "../features/TodolistsList/tasks-reducer";


const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware, sagaMiddleware)
})

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield takeEvery("APP/INITIALIZE-APP", initializeAppWorkerSaga)
    yield takeEvery("TASKS/FETCH-TASKS", fetchTasksWorkerSaga)
}

function* rootWorker() {

}
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
        store.replaceReducer(rootReducer)
    })
}
