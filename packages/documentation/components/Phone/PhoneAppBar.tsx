import React, { FC } from "react";
import cn from "classnames";
import { AppBar, AppBarProps } from "@react-md/app-bar";
import { bem } from "@react-md/theme";

import useAppSizeContext from "components/Layout/useAppSizeContext";

import { usePhoneContext } from "./context";
import StatusBar from "./StatusBar";

const block = bem("phone");

const PhoneAppBar: FC<AppBarProps> = ({ className, children, ...props }) => {
  const { id } = usePhoneContext();
  const { isPhone } = useAppSizeContext();

  return (
    <AppBar
      {...props}
      id={`${id}-app-bar`}
      className={cn(block("app-bar"), className)}
      fixed
      fixedElevation={false}
      dense={!isPhone}
    >
      <StatusBar id={id} isPhone={isPhone} />
      {children}
    </AppBar>
  );
};

PhoneAppBar.defaultProps = {
  theme: "default",
};

export default PhoneAppBar;
