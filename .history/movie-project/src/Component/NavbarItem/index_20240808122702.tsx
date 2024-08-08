import React from "react";


type TNavbarItem = {
  label: string;
  icon?: React.ReactNode;
  type?: string;
};

const NavbarItem = ({ label, icon, type = "" }: TNavbarItem) => {
  return (
    <button className="nav-link">
        <div className={`text-xm ${type}`}>{icon}</div>
        <div className={`nav-link-tittle text-xs ${type}`}>{label}</div>
    </button>
  );
};

export default NavbarItem;