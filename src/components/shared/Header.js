import React, { useState } from "react";
import Headroom from "react-headroom";
import logo from "../../assets/thunder.png";

import { Button, Divider, Drawer } from "antd";
import { Link } from "react-router-dom";

import { MenuOutlined } from "@ant-design/icons";
import { isAuthenticated } from "../../services/auth";
import { TOKEN_KEY } from "../../config/constants";

const Header = () => {
  const [openResponsiveMenu, setOpenResponsiveMenu] = useState(false);

  const dismissDrawer = () => {
    setOpenResponsiveMenu(false);
  };
  return (
    <Headroom>
      <div className={"menu-navbar"}>
        <Link to="/">
          <img src={logo} className={"logo-img"} />
        </Link>

        <div className={"menu-links"}>
          <Link to="/">Home</Link>
          <Link to="/gerenciar">Gerenciar Salas</Link>
        </div>

        <div>
          {isAuthenticated() ? (
              <div></div>
          ) : (
            <Link to={"/login"} className={"menu-login text-light"}>
              Login
            </Link>
          )}
          <MenuOutlined
            className={"menu-menu-icon"}
            onClick={() => setOpenResponsiveMenu((prevValue) => !prevValue)}
          />
        </div>
      </div>

      <Drawer
        placement={"top"}
        closable={true}
        onClose={() => setOpenResponsiveMenu(false)}
        visible={openResponsiveMenu}
        key={"top"}
        className={"responsive-drawer"}
      >
        <div className={"menu-responsive"}>
          <div className={"menu-links-responsive"}>
            <Link to="/" onClick={dismissDrawer}>
              Home
            </Link>
            <Link to="/gerenciar" onClick={dismissDrawer}>
              Gerenciar Salas
            </Link>
            <Divider className={"divider-responsive"} />
            {isAuthenticated() ? (
              <Button
                onClick={() => {
                  localStorage.removeItem(TOKEN_KEY);
                  window.location.reload();
                }}
                type={"link"}
                className={"menu-login-responsive"}
              >
                Leave
              </Button>
            ) : (
              <Link
                to={"/login"}
                className={"menu-login-responsive"}
                onClick={dismissDrawer}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </Drawer>
    </Headroom>
  );
};

export default Header;
