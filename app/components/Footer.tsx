import {pipe} from 'effect/Function';
import {isNotNullable} from 'effect/Predicate';
import * as RA from 'effect/ReadonlyArray';

import type {EnhancedMenu} from '~/lib/utils';

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

export function FooterMenu({menu}: {menu?: EnhancedMenu}) {
  //   const footerEnMenu = isNotNullable(menu) ? menu : [];
  //   FALLBACK_FOOTER_MENU.items;

  return pipe(
    menu,
    RA.fromNullable,
    RA.flatMap(({items}) => items),
    // RA.flatten,
    RA.map((menuItem, index) => {
      if (!isNotNullable(menuItem.url)) return null;
    }),
  );
}
