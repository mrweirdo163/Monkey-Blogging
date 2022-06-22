import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import UserTable from "./UserTable";

const UserManage = () => {
  return (
    <div>
      <DashboardHeading
        title="User"
        desc="Manage your information"
      ></DashboardHeading>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
