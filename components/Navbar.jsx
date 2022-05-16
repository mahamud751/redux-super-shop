import AdbIcon from "@mui/icons-material/Adb";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cart_delete } from "../redux/actions/cartAction";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getState = useSelector((state) => state.cartReducer.cart);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [price, setPrice] = React.useState(0);
  const total = () => {
    let price = 0;
    getState.map((pd) => {
      price = pd.price * pd.qtn + price;
      setPrice(price);
    });
  };

  React.useEffect(() => {
    total();
  }, [total]);

  const dispatch = useDispatch();

  const handleCart = (id) => {
    dispatch(cart_delete(id));
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link href={"/"}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Home
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Badge
              badgeContent={getState.length}
              color="primary"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <ShoppingCartIcon />
            </Badge>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {
                getState.length ? (
                  <div style={{ width: "300px" }}>
                    {getState.map((pd) => {
                      return (
                        <div className="d-flex justify-content-between p-3" key={pd.id}>
                          <img src={pd.imgdata} alt="" style={{ width: "5rem", height: "5rem" }} />
                          <p>{pd.rname}</p>
                          <DeleteIcon onClick={() => handleCart(pd.id)} />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div></div>
                )
                //   <div className="card_details" style={{ width: "24rem", padding: 10 }}>
                //     <Table>
                //       <thead>
                //         <tr>
                //           <th>Photo</th>
                //           <th>Restaurant Name</th>
                //         </tr>
                //       </thead>
                //       <tbody>
                //         {getState.map((e) => {
                //           return (
                //             <>
                //               <tr>
                //                 <td>
                //                   <Link href={`/productDetails/${e.id}`} onClick={handleClose}>
                //                     <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt="" />
                //                   </Link>
                //                 </td>
                //                 <td>
                //                   <p>{e.rname}</p>
                //                   <p>Price : ₹{e.price}</p>
                //                   <p>Quantity : {e.qnty}</p>
                //                   <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                //                     <i className="fas fa-trash smalltrash"></i>
                //                   </p>
                //                 </td>

                //                 <td className="mt-5" style={{ color: "red", fontSize: 20, cursor: "pointer" }}>
                //                   <DeleteIcon onClick={() => handleCart(e.id)} />
                //                 </td>
                //               </tr>
                //             </>
                //           );
                //         })}
                //         <p className="text-center">Total :₹ {price}</p>
                //       </tbody>
                //     </Table>
                //   </div>
                // ) : (
                //   <div className="card_details d-flex justify-content-center align-items-center" style={{ width: "24rem", padding: 10, position: "relative" }}>
                //     <p style={{ fontSize: 22 }}>Your carts is empty</p>
                //     <img src="./cart.gif" alt="" className="emptycart_img" style={{ width: "5rem", padding: 10 }} />
                //   </div>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
