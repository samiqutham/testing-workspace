import { getIconNames } from "@workspace/ui/lib/utils";
import React from "react";
import IconGallery from "@workspace/ui/common/components/icon-view/index";

const IconsRoute = () => {
  const names = getIconNames();
  return <IconGallery names={names} />;
};

export default IconsRoute;
