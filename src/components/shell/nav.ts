export type ShellNavItem = {
  label: string;
  href: string;
};

export function isShellItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
