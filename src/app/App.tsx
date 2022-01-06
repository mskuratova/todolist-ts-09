import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import { logoutTC } from '../features/Login/auth-reducer'

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootStateType>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(initializeAppTC())
    },[])
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

    const logoutHandler =() => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
        style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
          <CircularProgress />
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    { isLoggedIn && <Button color="inherit">Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList demo={demo}/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="/404" element={<h1> 404. Page not found</h1>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
