# Documentation for BottomNav.tsx
The BottomMenu component is a React component that represents a bottom navigation menu or overlay. It provides a user interface element commonly used for presenting additional options or content at the bottom of the screen. The menu can be opened or closed based on the isOpen prop. 

### Props and usage
`id`: String value that is assigned to the main model 
    when this is appended in the url followed by `#` it opens the dialog

`children`: Children props contains all the html that you have declared in the scope of the component.


### functions 
`handleClose` is the function that closes the dialog it basically remove that hash from url which hides it from the screen

### Following is the css used in the component
```css
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust the alpha value for transparency */
  display: flex;
  align-items: center;
  justify-content: center;
}

.rounded-md {
  border-radius: 0.375rem; /* 6px */
}
```