export type MenuItem = {
  label: string;
  href: string;
};

export type TMainMenuProps = {
  className?: string;
  items: MenuItem[];
  isSwitchable?: boolean;
  isOpen?: boolean;
  slotTop?: React.ReactNode;
  closeMenu?: () => void;
};
