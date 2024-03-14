# SubMenu Component

### Purpose

The `SubMenu` component is used to render a dropdown menu containing a list of menu items. It allows users to navigate to different sections of the website by selecting the desired menu item.

### Props

`items` : this is the array of the menu items.

`title` : Title is the string which appears before showing the submenu.

`side` : Side can have of two value `right` or `null` this is to mention from which side you need to open the menu

### States
`isSubMenuOpen` : this state is used to handle the visiblity of the submenu. its default value is `false`  means the submenu is hidden. `setSubMenuOpen` is the function that changes the value of `isSubMenuOpen` alternatly means if value is `true` it makes it `false` and vice versa.
