import {useParams, Form, Await, NavLink,Link as ReactLink} from '@remix-run/react';
import {useWindowScroll} from 'react-use';
import {Disclosure} from '@headlessui/react';
import {Suspense, useEffect, useMemo, useState} from 'react';
import {CartForm, Image} from '@shopify/hydrogen';
import {FaWhatsapp, FaFacebookSquare, FaYoutube} from 'react-icons/fa';
import {FaTwitter, FaInstagram, FaAngleRight} from 'react-icons/fa6';
import fwLogo from '~/public/logo.png';
import {type LayoutQuery} from 'storefrontapi.generated';
import {
  Drawer,
  useDrawer,
  Text,
  Input,
  // IconLogin,
  // IconAccount,
  IconBag,
  IconSearch,
  Heading,
  IconMenu,
  IconCaret,
  Section,
  CountrySelector,
  Cart,
  CartLoading,
  Link,
  OfferMarque,
} from '~/components';
import {
  type EnhancedMenu,
  type ChildEnhancedMenuItem,
  useIsHomePath,
} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import {useRootLoaderData} from '~/root';
import {OFFER_DATA} from '~/data/dataChanges';
import VisaCardIcon from '~/icons/VisaCardIcon';
import MasterCardIcon from '~/icons/MasterCardIcon';
import GpayIcon from '~/icons/GpayIcon';
import ShopIcon from '~/icons/ShopIcon';

import SubMenu from './Submenu';
import {TracingBeam} from './UIAcernity/TracingBeam';
import { processURL } from '~/utils';

type LayoutProps = {
  children: React.ReactNode;
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

export function Layout({children, layout}: LayoutProps) {
  const {headerMenu, footerMenu} = layout || {};
  return (
    <>
      <div className="flex flex-col min-h-screen font-Montserrat">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>

        {OFFER_DATA && <OfferMarque offers={OFFER_DATA} />}

        {headerMenu && layout?.shop.name && (
          <Header title={layout.shop.name} menu={headerMenu} />
        )}

        {/* <TracingBeam> */}

        <main role="main" id="mainContent" className="flex-grow bg-prim">
          {children}
        </main>

        {/* </TracingBeam> */}
      </div>
      {footerMenu && <Footer menu={footerMenu} />}
    </>
  );
}

function Header({title, menu}: {title: string; menu?: EnhancedMenu}) {
  const isHome = useIsHomePath();

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
      />
      <MobileHeader
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function CartDrawer({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const rootData = useRootLoaderData();

  return (
    <Drawer open={isOpen} onClose={onClose} heading="" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={rootData?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({
  isOpen,
  onClose,
  menu,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu: EnhancedMenu;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="bottom" heading="">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({
  menu,
  onClose,
}: {
  menu: EnhancedMenu;
  onClose: () => void;
}) {
  const [show_sub_menu, set_sub_menu] = useState(menu?.items);
  return (
    <nav
      className={`grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8 w-screen text-black overflow-y-scroll scrollbar-hide max-h-[70vh]`}
    >
      <div
        className={`${show_sub_menu != menu?.items ? '' : 'hidden'}`}
        onClick={() => {
          set_sub_menu(menu?.items);
        }}
      >
        Go Back
      </div>
      {(show_sub_menu || []).map((item) => {
        const hasSubMenu = item.items && item.items.length > 0;

        return hasSubMenu ? (
          <div
            onClick={() => {
              set_sub_menu(item.items);
            }}
          >
            <div
              className="flex flex-row items-center justify-between w-full my-5"
              key={item.id}
            >
              <span>{item.title}</span>
              <FaAngleRight className="rounded-full bg-[#d3d3d3] text-black hover:bg-slate-950 hover:text-white" />
            </div>
          </div>
        ) : (
          <div
            className="flex flex-row items-center justify-between w-full my-5"
            key={item.id}
          >
            <ReactLink
            
              to={processURL(item.url,/\/collections\/[a-zA-Z0-9-]+/)}
              target={item.target}
              onClick={onClose}
              className={({isActive}) =>
                isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
              }
            >
              <Text as="span" size="copy">
                {item.title}
              </Text>
            </ReactLink>
            <ReactLink
              to={processURL(item.url,/\/collections\/[a-zA-Z0-9-]+/)}
              target={item.target}
              prefetch="intent"
              onClick={onClose}
              className={({isActive}) => (isActive ? 'pb-1' : 'pb-1')}
            >
              <FaAngleRight className="rounded-full bg-[#d3d3d3] text-black hover:bg-slate-950 hover:text-white" />
            </ReactLink>
          </div>
        );
      })}
      <div className="flex flex-row justify-between items-center w-full mb-3 mt-5">
      <Link
        to={insta_link}
        target={insta_link}
        prefetch="intent"
        className={({isActive}) => (isActive ? 'pb-1' : 'pb-1')}
      ><FaInstagram className="" />
      </Link>
      <Link
        to={whatsapp_link}
        target={whatsapp_link}
        prefetch="intent"
        className={({isActive}) => (isActive ? 'pb-1' : 'pb-1')}
      >
        <FaWhatsapp className="" />
      </Link>
      <Link
        to={facebook_link}
        target={facebook_link}
        prefetch="intent"
        className={({isActive}) => (isActive ? 'pb-1' : 'pb-1')}
      >
        <FaFacebookSquare />
      </Link>
      <Link
        to={youtube_link}
        target={youtube_link}
        prefetch="intent"
        className={({isActive}) => (isActive ? 'pb-1' : 'pb-1')}
      > 
        <FaYoutube size={20} />
      </Link>
      </div>
      <div className="border-b-2 w-full"></div>
      <div className="mt-3 w-full">Account</div>
    </nav>
  );
}

function MobileHeader({
  title,
  isHome,
  openCart,
  openMenu,
}: {
  title: string;
  isHome: boolean;
  openCart: () => void;
  openMenu: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const params = useParams();

  return (
    <header
      role="banner"
      className={`text-contrast ${
        scrolled ? 'backdrop-blur-md bg-white/30' : 'header_color'
      } sticky
      flex lg:hidden items-center h-nav z-40 top-0 justify-between w-full leading-none gap-4 md:px-8 z-50 px-3`}
    >
      <div className="flex items-center justify-start w-full gap-4">
        <button
          onClick={openMenu}
          className="relative flex items-center justify-center"
        >
          <IconMenu width="w-[35px]" height="h-[35px]" />
        </button>
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="items-center gap-2 sm:flex"
        >
          <button
            type="submit"
            className="relative flex items-center justify-center"
          >
            <IconSearch width="w-[30px]" height="h-[30px]" />
          </button>
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
        </Form>
      </div>
      <div className="">
        <Link
          className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
          to="/"
        >
          {/* <img src={fwLogo} className='h-[5vh] w-auto'/> */}
          <Image
            src={fwLogo}
            alt="Logo"
            width={'1080px'}
            height={'217px'}
            className=""
          />
        </Link>
      </div>
      <div className="flex items-center justify-end w-full gap-4">
        {/* <AccountLink className="relative flex items-center justify-center w-8 h-8" /> */}
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

function DesktopHeader({
  isHome,
  menu,
  openCart,
  title,
}: {
  isHome: boolean;
  openCart: () => void;
  menu?: EnhancedMenu;
  title: string;
}) {
  const params = useParams();
  const {y} = useWindowScroll();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  var [isMenuOpen, setMenuState] = useState(false);

  return (
    <header
      id='nav_desk_header'
      role="banner"
      className={`navbar_element 
          text-contrast ${
            (scrolled && !isMenuOpen)? 'backdrop-blur-md bg-white/30' : 'header_color'
          } 
          sticky
          hidden h-nav lg:flex items-center transition duration-300 z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8 z-50 `}
    >
      <div className="flex items-center gap-12">
        <ReactLink className="font-bold" to="/" prefetch="intent">
          {/* {title} */}
          <img src={fwLogo} className="w-80" alt="" />
        </ReactLink>
        <nav className="flex gap-6 font-bold text-white">
          {/* Top level menu items */}
          {(menu?.items || []).map((item) => {
            const hasSubMenu = item.items && item.items.length > 0;

            return hasSubMenu ? (
              <SubMenu items={item.items} title={item.title} root={true} setmenuState={setMenuState}/>
            ) : (
              <div>
                <ReactLink
                  key={item.id}
                  to={item.to}
                  target={item.target}
                  prefetch="intent"
                  className={({isActive}) =>
                    isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
                  }
                >
                  {item.title}
                </ReactLink>
              </div>
            );
          })}
        </nav>
        {/* <TestSubmenu /> */}
      </div>
      <div className="flex items-center gap-1">
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="flex items-center gap-2"
        >
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
          >
            <IconSearch />
          </button>
        </Form>
        {/* <AccountLink className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5" /> */}
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

// function AccountLink({className}: {className?: string}) {
//   const rootData = useRootLoaderData();
//   const isLoggedIn = rootData?.isLoggedIn;

//   return (
//     <Link to="/account" className={className}>
//       <Suspense fallback={<IconLogin />}>
//         <Await resolve={isLoggedIn} errorElement={<IconLogin />}>
//           {(isLoggedIn) => (isLoggedIn ? <IconAccount /> : <IconLogin />)}
//         </Await>
//       </Suspense>
//     </Link>
//   );
// }

function CartCount({
  isHome,
  openCart,
}: {
  isHome: boolean;
  openCart: () => void;
}) {
  const rootData = useRootLoaderData();

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={rootData?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({
  openCart,
  dark,
  count,
}: {
  count: number;
  dark: boolean;
  openCart: () => void;
}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag width="w-[42px]" height="h-[42px]" />
        <div
          className={`${
            dark
              ? 'text-primary bg-contrast dark:text-contrast dark:bg-primary'
              : 'text-contrast bg-primary'
          } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
        >
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
}

function Footer({menu}: {menu?: EnhancedMenu}) {
  const isHome = useIsHomePath();
  const itemsCount = menu
    ? menu?.items?.length + 1 > 4
      ? 4
      : menu?.items?.length + 1
    : [];

  return (
    <Section
      divider="none"
      as="footer"
      role="contentinfo"
      padding="none"
      display="flex"
      // w-full py-8 px-6 md:px-8 lg:px-12
      //
      className={`w-full py-4 bg-primary dark:bg-contrast dark:text-primary text-contrast flex-col items-center justify-center`}
    >
      <div className="flex items-center justify-center">
        <Image
          src={fwLogo}
          alt="Logo"
          width={'1080px'}
          height={'217px'}
          className="brand_logo"
        />
      </div>
      <ContactSection />
      <FooterMenu menu={menu} />
      <div className="w-full flex flex-row items-center lg:justify-center justify-between my-5 px-10">
        <VisaCardIcon />
        <MasterCardIcon />
        <GpayIcon />
        <ShopIcon />
      </div>
      {/* <CountrySelector /> */}
      <div
        className={`self-center pt-8 opacity-50 md:col-span-2 lg:col-span-${itemsCount}`}
      >
        &copy; {new Date().getFullYear()} Fashion Wallah. All rights reserved.
      </div>
    </Section>
  );
}

function FooterLink({item}: {item: ChildEnhancedMenuItem}) {
  if (item.to.startsWith('http')) {
    return (
      <a href={item.to} target={item.target} rel="noopener noreferrer">
        {item.title}
      </a>
    );
  }

  return (
    <Link to={item.to} target={item.target} prefetch="intent">
      {item.title}
    </Link>
  );
}

const ContactSection = () => {
  return (
    <div className="flex lg:flex-row flex-col justify-center lg:items-start items-center">
      <div className="flex flex-col justify-between items-center row_col_mx my-3 lg:mx-16 mx-3">
        <div className="lg:text-4xl text-2xl">Hey there 👋🏼</div>
        <div className="text-gray-200 my-3 text-2xl text-center">
          Stay in touch for good vibes & no spam.
        </div>
        <div>
          <div className="mb-4 m-3 p-3 lg:w-80 contact_section ">
            <label className="block text-gray-300 text-sm mb-2" htmlFor="Email">
              E-mail
            </label>
            <div className="flex flex-row">
              <input
                className="appearance-none
                    contact_input
                    text-gray-700
                    leading-tight
                    bg-transparent
                    focus:text-white
                    footer_font
                    contact_input
                    border-x-0 border-t-0
                    ring-0
                    border-b-2 border-primary/10
                    focus:ring-0
                    focus:border-primary/10
                    "
                style={{minWidth: '10vw', maxWidth: '90vw'}}
                id="Email"
                type="text"
              />
              <button className="rounded-full text-white bg-none mx-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-gray-200 text-md my-3 lg:w-1/3 w-2/3">
        Fashionwallah is an elegant e-commerce destination specializing in
        exquisite jewelry pieces, offering a curated selection of trendy and
        timeless designs to elevate any ensemble. From statement necklaces to
        delicate bracelets, Fashionwallah caters to fashion-forward individuals
        seeking to adorn themselves with quality craftsmanship and unique pieces
        that reflect their personal style. With a focus on both contemporary
        trends and classic elegance, Fashionwallah aims to be the go-to
        destination for those seeking to accessorize with sophistication and
        flair
      </div>
    </div>
  );
};

function FooterMenu({menu}: {menu?: EnhancedMenu}) {
  const styles = {
    section: 'grid gap-4',
    nav: 'grid gap-2 pb-6',
  };

  return (
    <div className="w-full flex justify-center items-center stone_gray text-contrast">
      {(menu?.items || []).map((item) => (
        <section
          key={item.id}
          className={styles.section + ' text-md mx-2 lg:mx-12 text-center'}
        >
          <Link
            key={item.id}
            to={item.to}
            target={item.target}
            prefetch="intent"
            className={({isActive}) => (isActive ? 'pb-1' : 'pb-1')}
          >
            {item.title}
          </Link>

          {/* <Disclosure>
            {({open}) => (
              <>
                <Disclosure.Button className="text-left md:cursor-default">
                  <Heading className="flex justify-between" size="lead" as="h3">
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                      <Disclosure.Panel static>
                        <nav className={styles.nav}>
                          {item.items.map((subItem: ChildEnhancedMenuItem) => (
                            <FooterLink key={subItem.id} item={subItem} />
                          ))}
                        </nav>
                      </Disclosure.Panel>
                    </Suspense>
                  </div>
                ) : null}
              </>
            )}
          </Disclosure> */}
        </section>
      ))}
    </div>
  );
}

const youtube_link = 'https://www.youtube.com/@FashionwallahIndia?si=ZYsErV6xtD8zZ2tE';
const whatsapp_link = 'https://wa.me/9763307939';
const facebook_link = 'https://www.facebook.com/share/9BC8goz9Bgt6a9Tb/?mibextid=qi2Omg';
const insta_link = 'https://www.instagram.com/fashionwallah.in?igsh=enI0dmIzazExaTJk';