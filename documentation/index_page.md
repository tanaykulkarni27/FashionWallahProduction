# CSS styles documentation for index.tsx

### Following are the tailwind standard tailwind
```css
.w-full {
  width: 100%;
}

.text-center {
  text-align: center;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.text-extralight {
  font-weight: 200;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.rounded-md {
  border-radius: 0.375rem; /* 6px */
}

.text-transparent {
  color: transparent;
}

.bg-clip-text {
  background-clip: text;
}

.bg-gradient-to-b {
  background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
}

.from-indigo-700 {
  --tw-gradient-from: #4f46e5;
}

.to-indigo-950 {
  --tw-gradient-to: #1a202c;
}
```
### margins and paddings 
margins and paddings are defined using class ```m-<size>``` or ```p-<size>``` respectively .
Example classes are given below of padding and margin.
```css
/* class for padding */
.p-5{
    padding: 1.25rem; 
}

/* class for margins */
.m-5{
    margin: 1.25rem; 
}   
```
### Margin and Padding in specific side
In the same way to define the margin or padding to the specific side we have 
```css
/* for margins */
ml /* margin left */
mr /* margin right */
mt /* margin top */
mb /* margin bottom */
mx /* margin left and margin right */
my /* margin top and margin bottom */

/* for padding */
pl /* padding left */
pr /* padding right */
pt /* padding top */
pb /* padding bottom */
px /* padding left and padding right */
py /* padding top and padding bottom */
```
after this use ```-<size>``` to add size.
### Colors and Gradients 
following classes are the gradinet colors which are defined in colors.css
```
taupe-dark
trans_taupe
off_white_white
```
Note : Each component is described in their own documentation.