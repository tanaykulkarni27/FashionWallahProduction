# Documentation for BannerCarousel.tsx
BannerCarousel takes the array of banners as prop `Banner_Data`<br>
The root div has got following classes : <br>
```css
.relative{ position:relative; } /* this is used to position the child elements */
.h-screen{ height:100vh; } /* height same as screen height */
.w-screen{ width:100vw; } /* width same as screen width */
```
We iterate over the array of banners to render them.
Every banner is rendered using the `transition` component to add the transition when the banner is changed.
to control the visiblity of every banner we use `activeIndex` state whose initial value is `0` that is the first index of the banner array to show the first banner initially.<br><br>

To change the banner on the Carousel we need to change the value of activeIndex and that is changed when you click on dots.
it calls the function `setActiveIndex` which changes the `activeIndex` and this activeIndex is compared with the every banners index in the `transition` components `show` attribute.