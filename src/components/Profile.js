import React, { Component } from "react";
import SideNavBar from "./SideNavBar";
import SideNavMaterialUI from "./SideNavMaterialUI";

class Profile extends Component {
  render() {
    return (
      <div className="body">
        <SideNavMaterialUI />
        <div className="content">Profile coming soon</div>
      </div>
    );
  }
}

export default Profile;
