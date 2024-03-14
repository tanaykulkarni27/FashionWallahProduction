import {useState, useEffect} from 'react';
import {NavLink} from '@remix-run/react';

import type {ParentEnhancedMenuItem} from '~/lib/utils';
import {ChildEnhancedMenuItem} from '~/lib/utils';

import {Link} from './Link';
type SubMenuProps = {
  items: ParentEnhancedMenuItem[];
  title: string;
  side: 'right' | null;
};

function SubMenu({items, title, side = null}: SubMenuProps) {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const handleMouseEnter = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div className={`relative inline-block group px-5`}
    >
      <Link
        to="#"
        className="font-bold footer_font"
        onMouseOver={handleMouseEnter}
      >
        {title}
      </Link>
      <div
        className={`absolute ${
          isSubMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } transition duration-300 ease-in-out
        ${side==='right'?'top-0 left-full':'mt-2 space-y-2 '} divide-y divide-white shadow-lg text-bold bg-primary dark:bg-contrast`}
      >
        {items.map((subItem) => {
          return subItem.items?(<SubMenu items={subItem?.items} title={subItem.title} side={'right'} />):(
            <NavLink
              key={subItem.id}
              to={subItem.url}
              className="block px-4 py-2 text-sm text-contrast dark:text-white text-center"
              style={activeLinkStyle}
            >
              {subItem.title}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
  };
}

/*
<div className="flex flex-row justify-between items-center w-full mb-3 mt-5">
            <FaInstagram className="" />
            <FaWhatsapp className="" />
            <FaLinkedinIn className="" />
            <FaPinterestP className="" />
            <FaTwitter className="" />
        </div>
        <div className="border-b-2 w-full"></div>
        <div className="mt-3 w-full">Account</div>
*/

export default SubMenu;
