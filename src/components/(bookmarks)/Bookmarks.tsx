import { NextLinkComposed } from "@/components/Link";
import { usePathname } from "next/navigation";
import StyledTab from "./input/StyledTab";
import StyledTabs, { type StyledTabsProps } from "./input/StyledTabs";

type BookmarksProps = {
  options: { label: string; href: string }[];
} & Omit<StyledTabsProps, "children" | "value">;

export default function Bookmarks({ options, ...props }: BookmarksProps) {
  const pathname = usePathname();
  const selected = options.findIndex(
    (opt) => opt.href.split("?")[0] === pathname
  );

  return (
    <StyledTabs {...props} value={selected === -1 ? 0 : selected}>
      {options.map(({ label, href }) => (
        <StyledTab
          key={label}
          label={label}
          component={NextLinkComposed}
          to={href}
        />
      ))}
    </StyledTabs>
  );
}
