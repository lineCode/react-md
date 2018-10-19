import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export interface ILinkBaseProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /**
   * An optional component to render as. This should really only be used if you are using a router library
   * like [react-router](https://github.com/ReactTraining/react-router) or
   * [@reach/router](https://github.com/reach/router). This will call `React.createElement` with this value
   * and provide all props and class name.
   *
   * @docgen
   */
  component?: React.ReactType;

  /**
   * An optional href to apply to the link. If this value is set to the empty string and the `component` prop is
   * not provided, the link will basically be disabled.
   *
   * @docgen
   */
  href?: string;

  /**
   * An optional target for the link to be opened in. It is recommended to keep this undefined in most cases. If
   * this is not `_blank`, `_parent`, `_self`, or `_top`, it should be the frame name that the link should
   * be rendered in if using frames.
   *
   * @docgen
   */
  target?: "_blank" | "_parent" | "_self" | "_top" | string;

  /**
   * An optional `rel` to apply to the link. This should be a combination of 1 to many of:
   * - "alternate"
   * - "author"
   * - "bookmark"
   * - "external"
   * - "help"
   * - "license"
   * - "next"
   * - "nofollow"
   * - "noreferrer"
   * - "noopener"
   * - "prev"
   * - "search"
   * - "tag"
   *
   * This is really just used to override the default behavior of the `preventMaliciousTarget` prop.
   *
   * @docgen
   */
  rel?: string;

  /**
   * Boolean if the link should automatically be updated to apply `rel=noopener noreferrer` when the `target` prop
   * is set to `"_blank"`. This is recommended to have enabled by default, but can be disabled by setting this prop
   * to `false` or specificying a `rel` prop yourself. You can read more about the reason for this
   * [here](https://mathiasbynens.github.io/rel-noopener/).
   *
   * @docgen
   */
  preventMaliciousTarget?: boolean;

  /**
   * Boolean if the Link should be positioned with a flexbox and align the items centered. This is disabled by default
   * but can be useful when rendering icons within the link.
   *
   * @docgen
   */
  flexCentered?: boolean;
}

export interface ILinkWithComponentProps extends ILinkBaseProps {
  /**
   * I'm not really sure of a good way to implement this, but when the `component` prop is provided, all valid props
   * from that component should also be allowed.
   */
  [key: string]: any;
  component: React.ReactType;
}

export interface ILinkDefaultProps {
  preventMaliciousTarget: boolean;
  flexCentered: boolean;
}

export type ILinkProps = ILinkBaseProps | ILinkWithComponentProps;
export type LinkWithDefaultProps = ILinkProps & ILinkDefaultProps;

/**
 * The `Link` component is used to render links within your app with a basic styles applied and
 * some additional "security" built-in if using the `rel="_blank"`. This can be used with a browser
 * routing library like `react-router` or `reach-router` by providing the `Link` as the `linkComponent`
 * prop.
 */
export default class Link extends React.Component<ILinkBaseProps> {
  public static propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    component: PropTypes.func,
    target: PropTypes.string,
    rel: PropTypes.string,
    preventMaliciousTarget: PropTypes.bool,
    flexCentered: PropTypes.bool,
  };

  public static defaultProps = {
    preventMaliciousTarget: true,
    flexCentered: false,
  } as ILinkDefaultProps;

  public render() {
    const {
      className: propClassName,
      component,
      href: propHref,
      children,
      rel: propRel,
      flexCentered,
      preventMaliciousTarget,
      ...props
    } = this.props as LinkWithDefaultProps;

    const { target } = props;
    const href = propHref === "" ? undefined : propHref;
    const className = cn(
      "rmd-link",
      {
        "rmd-link--flex-centered": flexCentered,
      },
      propClassName
    );

    let rel = propRel;
    if (typeof rel !== "string" && target === "_blank") {
      rel = "noopener noreferrer";
    }

    if (component) {
      return React.createElement(component, { ...props, rel, href, className }, children);
    }

    return (
      <a className={className} {...props} href={href} rel={rel}>
        {children}
      </a>
    );
  }
}