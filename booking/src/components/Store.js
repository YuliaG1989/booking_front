import { React, useState, useEffect } from 'react'
import { Link, Navigate } from "react-router-dom";
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Container from '@mui/material/Container'
import FormHelperText from '@mui/material/FormHelperText'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'




const Store = () => {
    const [items, setItems] = useState([])
    const [cart, setCart] = useState([])


    const getItems = () => {
        axios.get("http://localhost:5000/store").then(response => {
            setItems(response.data)
        })
    }

    useEffect(() => {
        getItems();
    }, []);


    const handleChange = (item, d) => {
        const ind = cart.indexOf(item);
        const arr = cart;
        arr[ind].quantity += d;

        if (arr[ind].quantity === 0) arr[ind].quantity = 1;
        setCart([...arr]);
    }
    const getTotalSum = () => {
        return cart.reduce(
            (sum, { price, quantity }) => sum + price * quantity,
            0
        );
    };
    const removeFromCart = (id) => {

        setCart(cart.find((cartitem) => cartitem.id !== id))

    }
    function Copyright() {
        return (
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <a color="inherit" href="#">
                    The Great Catsby.
                </a>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }
    const theme = createTheme(
        {
            palette: {
                primary: {
                    main: '#00897b',
                },
                secondary: {
                    main: '#ffffff',
                },
            },
        }
    )

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="absolute" >
                        <Toolbar sx={{
                            display: { xs: "flex" },
                            flexDirection: "row",

                            justifyContent: "space-between"
                        }}>
                            <Toolbar>
                                <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.5 }}>
                                    <h1>The Great Catsby.</h1>
                                </Typography>
                            </Toolbar>
                            <Toolbar>
                                <Link class='link' to="/login" >
                                    <Button variant="contained" >Sign in</Button>
                                </Link>
                                <Link class='link' to="/signup" >
                                    <Button variant="contained">Sign Up</Button>
                                </Link >
                                <Link class='link' to="/" state={{ items: items }} >
                                    <Button variant="contained">Main</Button>
                                </Link >
                                
                                <Link class='link' to="/home" state={{ cart: cart }}>
                                    <Button variant="contained">Go to Your Account</Button>
                                </Link>
                                <Badge>Cart({cart.length})</Badge>
                            </Toolbar>
                        </Toolbar>
                    </AppBar>


                    <Box
                        component="main"
                        sx={{
                            // backgroundImage: 'url(https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)',
                            backgroundColor: 'white',
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Container>

                            <Grid container spacing={3} >
                            {items.map((item) => {
                                return (
                                    <Grid item key={item.id} xs={12} sm={6} md={4}>
                                    
                                        <ul>
                                            <img src={item.image} />
                                            <li>{item.product}</li>
                                            <li>Price: {item.price}$</li>
                                            <li>{item.description}</li>
                                            <li>{item.quantity}</li>
                                            <Button onClick={() => {
                                                if (cart.indexOf(item) !== -1) return;
                                                setCart([...cart, item])
                                            }}>Add to cart</Button>
                                            { }
                                        </ul>
                                   
                                    </Grid>
                                )
                            })}
                            </Grid>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',

                                    height: 'auto',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                }}
                            >
                                <div >
                                <Grid container spacing={3} >
                                    {cart.map((cartitem) => {
                                        return (
                                            <Grid item key={cartitem.id} xs={12} sm={6} md={4}>

                                                <img class='cartImg' src={cartitem.image} />
                                                <li>{cartitem.product}</li>
                                                <li>{cartitem.description}</li>
                                                <li>Price: {cartitem.price}$</li>
                                                <div>
                                                    <button onClick={() => handleChange(cartitem, 1)}>+</button>
                                                    <button  >{cartitem.quantity}</button>
                                                    <button onClick={() => handleChange(cartitem, -1)}>-</button>
                                                </div>


                                            </Grid>

                                        )
                                    })}
                                    </Grid>
                                    {/* <Button onClick={removeFromCart}>Remove</Button> */}
                                    <h3>Total : {getTotalSum()} $</h3>
                                    <button onClick={() => setCart([])}>Clear</button>
                                </div>

                            </Paper>

                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </>

    )
}

export default Store;