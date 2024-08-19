"use client";

import { usePathname } from "next/navigation";
import { Children, cloneElement } from "react";

export default function ActiveWrapper({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === href
      : pathname.split("/")[1] === href.split("/")[1];

  const renderChildren = () => {
    return Children.map(children, (child: unknown) => {
      return cloneElement(child as React.ReactElement, {
        className: active ? "active-link" : "",
      });
    });
  };

  return <>{renderChildren()}</>;
}
