# MiniParallax
a lightweight, native, and simple JavaScript library for parallax scrolling. Ready to use in .html file
```html
<script src="MiniParallax.js"></script>
<script>
    const miniParallax = new MiniParallax()
</script>
```
## 1. Adding a parallax scroll listener
```javascript
miniParallax.add({
    y: [scrollFrom, scrollTo],
    i: [valueFrom, valueTo]
}, i => callback(i))
```
The first parameter is an object defining the scroll options. The second parameter callback function will be executed when the `window.scrollY` is inside the range of `scrollFrom` to `scrollTo`. Whereas the value `i` is equal to `valueFrom` when the scroll starts and ends with `valueTo` when the scroll ends.
### example
Suppose i have a box with position: absolute in html. When the windows scroll from 100px to 400px, i want the box to move left by reducing the style "left" from 800px to 300px

in MiniParallax, the syntax will be:
```javascript
const miniParallax = new MiniParallax()

const box = document.getElementById('box')
miniParallax.add({
    y: [ 100, 400 ], // when scrolls from 100px to 400px
    i: [ 800, 300 ]  // value i goes from 800 to 300
}, i => box.style.left = `${i}px` )
```
## 2. Multiple value range for specific scroll range
```javascript
miniParallax.add({
    y: [scrollFrom, scrollTo],
    ranges: [
        [ iFrom, iTo ],
        [ jFrom, jTo ],
        [ kFrom, kTo ],
    ]
}, (i, j, k) => callback(i, j, k))
```
Suppose the case is same as before, i want the box to "animate" when i scroll from 100px to 400px.

But this time, besides reducing margin-left from 800px to 300px, i also want to rotate the box once and make the box sticky. Here we have multiple value range when scrolling through 100px to 400px.

In MiniParallax, the syntax will be:
```javascript
const miniParallax = new MiniParallax()

const box = document.getElementById('box')
miniParallax.add({
    y: [ 100, 400 ], // when scrolls from 100px to 400px
    ranges: [
        [ 0, 360 ],   // value i goes from 0 to 360
        [ 100, 400 ], // value j goes from 100 to 400
        [ 800, 300 ]  // value k goes from 800 to 300
    ]
}, (i, j, k) => {
    box.style.transform: `rotate(${i}deg)` // rotate once
    box.style.top  = `${j}px` // sticky (appears still)
    box.style.left = `${k}px` // move left
} )
```
Note that you can define as much value range as you need by adding `[ from, to ]` inside `ranges` property and adding one more positional parameter in the callback function
