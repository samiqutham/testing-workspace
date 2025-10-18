'use client'
import React from "react";
import Loader from "@workspace/ui/common/loader/index";
import { createPortal } from "react-dom";

const Loading = () => {
  return createPortal(<Loader />, document.body);
};

export default Loading;
