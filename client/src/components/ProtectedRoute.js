import { message } from "antd";
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice.js";
import { useNavigate } from "react-router-dom";
import { ShowLoading, HideLoading } from "../redux/loaderSlice";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userMenu = [
    {
      title: "Home",
      paths: ["/"],
      icon: <i class="ri-home-line"></i>,
      onClick: () => navigate("/"),
    },
    {
      title: "Reports",
      paths: ["/reports"],
      icon: <i className="ri-file-chart-line"></i>,
      onClick: () => navigate("/reports"),
    },
    {
      title: "Profile",
      paths: ["/profile"],
      icon: <i className="ri-user-line"></i>,
      onClick: () => navigate("/profile"),
    },
    {
      title: "Logout",
      paths: ["/logout"],
      icon: <i className="ri-logout-circle-r-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  const adminMenu = [
    {
        title: "Home",
        paths: ["/"],
        icon: <i className="ri-home-line"></i>,
        onClick: () => navigate("/"),
      },
      {
        title: "Exams",
        paths: ["/admin/exams", "/admin/exams/add", "/admin/exams/edit/:id"  ],
        icon: <i className="ri-file-list-line"></i>,
        onClick: () => navigate("/admin/exams"),
      },
      {
        title: "Reports",
        paths: ["/admin/reports"],
        icon: <i className="ri-bar-chart-line"></i>,
        onClick: () => navigate("/admin/reports"),
      },
      {
        title: "Profile",
        paths: ["/admin/profile"],
        icon: <i className="ri-user-line"></i>,
        onClick: () => navigate("/profile"),
      },
      {
        title: "Logout",
        paths: ["/logout"],
        icon: <i className="ri-logout-circle-r-line"></i>,
        onClick: () => {
          localStorage.removeItem("token");
          navigate("/login");
        },
      },
  ];

  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserInfo();
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        dispatch(SetUser(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const activeRoute = window.location.pathname;

  const getIsActiveOrNot = (paths) => {
    if(paths.includes(activeRoute)) return true;
    else{
      if(activeRoute.includes("/admin/exams/edit") && paths.includes("/admin/exams")) return true;
    }
    return false;
  };

  return (
    <div className="layout h-100 w-100">
      <div className="flex h-screen gap-2">
        <div className="sidebar h-100">
          <div className="menu">
            {menu.map((item, index) => {
              return (
                <div
                  className={`menu-item ${
                    getIsActiveOrNot(item.paths) && "active-menu-item"
                  } `}
                  onClick={item.onClick}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="body">
          <div className="flex header justify-between">
            {!collapsed && (
              <i
                className="ri-close-line"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            {collapsed && (
              <i
                className="ri-menu-line"
                onClick={() => setCollapsed(false)}
              ></i>
            )}

            <h1 className="text-2xl">SHEY QUIZ</h1>
            <div className="flex gap-1 items-center">
              <i className="ri-user-line"></i>
              <div className="text-xl underline">{user?.name}</div>
            </div>
          </div>
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
