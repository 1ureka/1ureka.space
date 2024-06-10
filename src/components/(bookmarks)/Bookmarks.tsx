import { NextLinkComposed } from "@/components/Link";
import { usePathname } from "next/navigation";
import StyledTab from "./input/StyledTab";
import StyledTabs from "./input/StyledTabs";

export default function Bookmarks({
  options,
}: {
  options: { label: string; href: string }[];
}) {
  const pathname = usePathname();
  const selected = options.findIndex(
    (opt) => opt.href.split("?")[0] === pathname
  );

  return (
    <StyledTabs value={selected === -1 ? 0 : selected}>
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
