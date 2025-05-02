"use client";

import React from "react";
import { Toaster } from "../../components/@/ui/toaster";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
};

export default DashboardLayout;
