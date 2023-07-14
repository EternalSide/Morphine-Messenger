"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  href: string;
  active?: boolean;
  icon: any;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({ href, active, icon: Icon, onClick }) => {
  const handleClick = () => {
    if (onClick) return onClick();
  };
  return (
    <Link
      onClick={onClick}
      href={href}
      className={clsx(
        `group flex gapx-3 text-sm leading-6 font-semibold w-full justify-center p-4   hover:bg-gray-900`,
        active && "bg-gray-900 text-white",
        !active && " text-gray-500"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};
export default MobileItem;
