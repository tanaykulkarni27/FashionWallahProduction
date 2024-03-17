import {useState, useEffect} from 'react';
import {NavLink} from '@remix-run/react';
import type {ParentEnhancedMenuItem} from '~/lib/utils';
import { IoIosArrowForward,IoIosArrowDown } from "react-icons/io";
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
    <div className={`relative inline-block group px-5`} >
      <Link
        to="#"
        className="footer_font "
        onMouseOver={handleMouseEnter}
      >
        <div className='flex flex-row justify-center items-center'>
          <span className=''> {title} </span>
          {side !== 'right'?<IoIosArrowDown size={15} className='text-opacity-10'/>:<IoIosArrowForward size={15} className='text-opacity-10'/>}
        </div>
      </Link>
      <div
        className={`absolute ${
          isSubMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } transition duration-300 ease-in-out
        ${side==='right'?'top-0 left-full':'mt-2 space-y-2 '} divide-y divide-contrast shadow-lg  font-normal stone_gray`}
      >
        {items.map((subItem) => {
          return subItem.items?(<SubMenu items={subItem?.items} title={subItem.title} side={'right'} />):(
            <NavLink
              key={subItem.id}
              to={subItem.url}
              className="block px-4 py-2 text-sm text-contrast text-center"
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

*/

export default SubMenu;
