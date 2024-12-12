export type MenuItem = {
  label: string;
  href: string;
};

export type TMainMenuProps = {
  className?: string;
  items: MenuItem[];
};
