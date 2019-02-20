import React, { FunctionComponent, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { IWithForwardedRef } from "@react-md/utils";

import ListItemChildren, { IListItemChildrenProps } from "./ListItemChildren";
import getListItemHeight from "./getListItemHeight";

export type ListItemHeight =
  | "auto"
  | "normal"
  | "medium"
  | "large"
  | "extra-large";

export interface ISimpleListItemProps
  extends IListItemChildrenProps,
    HTMLAttributes<HTMLLIElement>,
    IWithForwardedRef<HTMLLIElement> {
  /**
   * This prop shouldn't really be used other than a pass-down value from the ListItem component.
   */
  disabled?: boolean;

  /**
   * Boolean if the list item should be updated to use the clickable styles to the item. This
   * is really just a pass-down value for the main `ListItem` component and shouldn't really be
   * used unless you are implementing your own clickable `ListItem` component.
   */
  clickable?: boolean;

  /**
   * Boolean if the list item should be considered "three-lines" in height. This will update
   * the `secondaryText` to span 2 lines instead of one, but it will not correctly applied
   * the trailing ellipsis overflow due to browser compatibility of `line-clamp`. If you
   * would still like the ellipsis to show, it is recommended to use javascript to add
   * them yourself.
   */
  threeLines?: boolean;

  /**
   * The height to apply to the list item. When it is set to `"auto"`, it will use:
   * - `"medium"` if a `leftIcon` or `rightIcon` is applied with no secondary text
   * - `"large"` if no `leftIcon` or `rightIcon` is applied but has secondary text
   * - `"extra-large"` if there is both a `leftIcon` or `rightIcon` with secondary text
   */
  height?: ListItemHeight;
}

interface ISimpleListItemDefaultProps {
  height: ListItemHeight;
  clickable: boolean;
  threeLines: boolean;
}

type SimpleListItemWithDefaultProps = ISimpleListItemProps &
  ISimpleListItemDefaultProps;

const SimpleListItem: FunctionComponent<
  ISimpleListItemProps
> = providedProps => {
  const {
    className,
    textClassName,
    secondaryTextClassName,
    textChildren,
    primaryText,
    secondaryText,
    leftIcon,
    rightIcon,
    forceIconWrap,
    children,
    forwardedRef,
    height: propHeight,
    threeLines,
    "aria-disabled": ariaDisabled,
    disabled,
    clickable,
    ...props
  } = providedProps as SimpleListItemWithDefaultProps;

  const height = getListItemHeight(providedProps);
  return (
    <li
      {...props}
      aria-disabled={
        typeof ariaDisabled === "string"
          ? ariaDisabled
          : (disabled && "true") || undefined
      }
      ref={forwardedRef}
      className={cn(
        "rmd-list-item",
        {
          [`rmd-list-item--${height}`]:
            height !== "auto" && height !== "normal",
          "rmd-list-item--three-lines": !!secondaryText && threeLines,
          "rmd-list-item--clickable": clickable,
        },
        className
      )}
    >
      <ListItemChildren
        textClassName={textClassName}
        secondaryTextClassName={secondaryTextClassName}
        primaryText={primaryText}
        secondaryText={secondaryText}
        textChildren={textChildren}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        forceIconWrap={forceIconWrap}
      >
        {children}
      </ListItemChildren>
    </li>
  );
};

const defaultProps: ISimpleListItemDefaultProps = {
  height: "auto",
  clickable: false,
  threeLines: false,
};

SimpleListItem.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  SimpleListItem.displayName = "SimpleListItem";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    SimpleListItem.propTypes = {
      disabled: PropTypes.bool,
      clickable: PropTypes.bool,
      threeLines: PropTypes.bool,
      height: PropTypes.oneOf([
        "auto",
        "normal",
        "medium",
        "large",
        "extra-large",
      ]),
    };
  }
}

export default forwardRef<HTMLLIElement, ISimpleListItemProps>((props, ref) => (
  <SimpleListItem forwardedRef={ref} {...props} />
));
