import {useState, useEffect} from 'react';
import {NavLink,Link as ReactLink} from '@remix-run/react';
import type {ParentEnhancedMenuItem} from '~/lib/utils';
import { IoIosArrowForward,IoIosArrowDown } from "react-icons/io";
import {Link} from './Link';
import { processURL } from '~/utils';
type SubMenuProps = {
  items: ParentEnhancedMenuItem[];
  title: String;
  root:boolean;
  side: 'right' | null;
  setmenuState:any;
};

function SubMenu({items, title,root=false, side = null,setmenuState}: SubMenuProps) {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const handleMouseEnter = () => {
    setSubMenuOpen(true);
    setmenuState(true);
  };
  const handleMouseOut = () => {
    setSubMenuOpen(false);
    setmenuState(false);
  };

  return (
    <div className={`relative min-w-[100px] text-white`} 
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseOut}>
 
      <ReactLink
        to="#"
        className=""
      >
        <div className={`flex flex-row justify-between items-center text-white ${side != null && 'text-sm py-2 px-4 '} text-left w-full ${!root && 'hover:bg-[#c39898]'}`}>
          <span className=' text-center w-full'> {title} </span>
        </div>
      </ReactLink>
      <div
        className={`
        ${isSubMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition duration-300 ease-in-out
        absolute ${side === 'right' ? 'top-0 left-full' : 'top-full left-0 right-0'}
        shadow-lg font-normal header_color`}>
        {items.map((subItem) => {
          return (subItem.items && subItem.items.length > 0)?(<SubMenu items={subItem?.items} title={subItem.title} side={'right'} />):(
            <NavLink
              key={subItem.id}
              to={processURL(subItem.url,/\/collections\/[a-zA-Z0-9-]+/)}
              className="block text-sm py-2 px-4 text-left min-w-[100px] hover:bg-[#c39898]"
              style={activeLinkStyle}
            >
              {subItem.title}
              <span></span>
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
