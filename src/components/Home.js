import { React, useState, useEffect, createRef } from 'react'
import { Link, Navigate } from "react-router-dom";
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Container from '@mui/material/Container'
import axios from 'axios'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Drawer from '@mui/material/Drawer';
import { useLocation } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import Store from './Store'
import Modal from '@mui/material/Modal'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 600,
  bgcolor: 'background.paper',
  
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
   <>
      <Button onClick={handleOpen}>Checkout</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        
      >
        <Box sx={{ ...style, width: 800 }}>
          
          <Button variant="contained" onClick={handleClose}>Checkout</Button>
        </Box>
      </Modal>
      </>
   
  );
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
        main: '#ffffff' ,
      },
    },
  }
)







const Home = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [clients, setClients] = useState([])
  const [firstname, setFirstName] = useState()
  const [lastname, setLastName] = useState()
  const [pets, setPets] = useState([])
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [phone, setPhone] = useState()
 
  const [items, setItems] = useState([])
  const [cart, setCart] = useState([])
  const [currentClient, setCurrentClient] = useState()
  const [currentClientID, setCurrentClientID] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  // ___FETCH CLIENTS
  const getCurrentClient = async () => {
    try {
      const res = await fetch("https://thegreatcat.herokuapp.com/home", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();

      setCurrentClient(parseRes.firstname);
      setCurrentClientID(parseRes.id)
    } catch (err) {
      console.error(err.message);
    }
  };

  //____LOGOUT
  const Logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("token")
  };

  useEffect(() => {
    getCurrentClient();
  }, []);
  // ___FETCH CLIENTS


  const getClients = () => {
    axios.get("https://thegreatcat.herokuapp.com/").then(response => {
      setClients(response.data)
    })
  }

  useEffect(() => {
    getClients();
  }, []);

  // ____UPDATE PROFILE
  const updateProfile = (event) => {
    event.preventDefault();

    axios.put("https://thegreatcat.herokuapp.com/" + event.target.id,
      {
        firstname: firstname,
        lastname: lastname,
        pets: pets,
        phone: phone,
        email: email,
        password: password
      }).then(
        (response, error) => {
          if (error){
            console.log(error)
          }else
          setClients(response.data)
        }
      )
  }
  // ____DELETE PROFILE

  const deleteProfile = (event) => {
    axios.delete("https://thegreatcat.herokuapp.com/" + event.target.value).then(
      (response) => {
        setClients(
          response.data
        )
      }
    )

  }
  const getItems = () => {
    axios.get("https://thegreatcat.herokuapp.com/store").then(response => {
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

const [state, setState] = useState({
   
  bottom: false

});

const toggleDrawer = (anchor, open) => (event) => {
 
  setState({ ...state, [anchor]: open });
};

const list = (anchor) => (
  <Box
    // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 500 : 500 }}
    // role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    
  >
    <Button onClick={toggleDrawer(anchor, false)}>Close</Button>
    <List>
    
      {items.map((item) => {
        return (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <ListItem disablePadding>

              <img src={item.image} />
            </ListItem>
            <ListItem>
              <ListItem>{item.product}</ListItem>
              <ListItem>Price: {item.price}$</ListItem>
              <ListItem>{item.description}</ListItem>
              <ListItem>{item.quantity}</ListItem>
            </ListItem>
                <Button variant="contained" onClick={() => {
                  if (cart.indexOf(item) !== -1) return;
                  setCart([...cart, item])
                }}>Add to cart</Button>

          </Grid>
        )
      })}
 
    </List>
  </Box>
);

 
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
                  <h2>Hello, {currentClient}!</h2>
                </Typography>
              </Toolbar>
              <Toolbar>
                  {[ 'shop'].map((anchor) => (
                <>
          <Button variant="contained" onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
          </>
      ))}
                <Button variant="contained" onClick={handleOpen}>Cart({cart.length})</Button>
                <Link class='link' to="/" >
                  <Button variant="contained"> Main Page </Button>
                </Link>
                <Button variant="contained" onClick={Logout}> LogOut</Button>
               
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box sx={{ ...style, width: 800}}>
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

                                                <Button onClick={removeFromCart}>Remove</Button>
                                            </Grid>

                                        )
                                    })}
                                    </Grid>
                                    
                                    <h3>Total : {getTotalSum()} $</h3>
                                    <button onClick={() => setCart([])}>Clear</button>
                              
                    <ChildModal />
                  </Box>
                </Modal>
                {!isAuthenticated ? <Navigate to="/" /> : null}

              
              </Toolbar>
            </Toolbar>
          </AppBar>
        
      
              
          <Box
            component="main"
            sx={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1491485880348-85d48a9e5312?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />

            <Container sx={{ mt: 4, mb: 4 }}>
             
        
              <Grid sx={{ marginTop: 10 }} container spacing={3}>

                <Grid item xs={12} md={6} lg={6}>
                  {/* <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 'auto',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)'
                    }}
                  > */}
                    <iframe id="appointy-iframe" class="no-border" src="https://booking.appointy.com/catsby?isgadget=1&autoheight=1" scrolling="no" width="100%" frameBorder="0"></iframe>
                    <script>
                      {(function () {
                        const ifrm = document.getElementById("appointy-iframe");
                        window.addEventListener("message", function (e) {
                          const d = e.data || {};
                          if (d.type === "height") {
                            ifrm.style.height = d.data + "px";
                          }
                          if (d.type === "scroll") {
                            ifrm.scrollIntoView();
                          }
                        });
                      })()}
                    </script>

                  {/* </Paper> */}
                </Grid>
           
                <Grid item xs={12} md={6} lg={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 'auto',
                      backgroundColor: 'rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    {clients.map((getOne) => {
                      if (getOne.id === currentClientID) {
                        return (

                          <div className='clients' key={getOne.id}>
                            <Typography component="h4" variant="h5">
                              <ul>

                                <li> <b>Pets:</b> <i>{getOne.pets}</i></li>
                                <Divider/>
                                <h5>Contact information</h5>
                                <li><b> Email:</b> <i> {getOne.email}</i></li>
                                <li> <b>Phone:</b> <i>{getOne.phone}</i></li>
                              </ul>
                            </Typography>
                           
                            <form onSubmit={updateProfile} id={getOne.id}>   
                                <FormControl >
                                                            
                                <Input sx={{width:400}} type='text' placeholder='First Name' onChange={e => setFirstName(e.target.value)} /><br />
                                <Input type='text' placeholder='Last Name' onChange={e => setLastName(e.target.value)} /><br />
                                <Input type='text' placeholder='Pets' onChange={e => setPets(e.target.value)} /><br />
                                <Input type='text' placeholder='Email' onChange={e => setEmail(e.target.value)} /><br />
                                <Input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} /><br />
                                <Input type='number' placeholder='Phone' onChange={e => setPhone(e.target.value)} /><br />
                                <Button variant="contained"  type='submit' value='Submit'>Update</Button>
                                <Button sx={{ marginTop: 2 }} variant="contained" onClick={deleteProfile} value={getOne.id}>Delete Profile</Button>
                                
                                </FormControl> 
                                </form>
                              
                            
                          </div>

                        )
                      }

                    })}
                  </Paper>

                      
                </Grid>
              </Grid>
            
            </Container>
          </Box>
        </Box>
        <footer>
          <Copyright color='primary' sx={{ pt: 4 }} />
          </footer>
      </ThemeProvider>

    </>
  )
}


export default Home;