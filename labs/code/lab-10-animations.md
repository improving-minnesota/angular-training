# Lab Ten - Animations

&nbsp;
## Set up the CSS class for animated items

* We are going to add an animation that gives the items in our tables a fading in effect.
* This will help make the user experience feel less 'choppy'.

### Add the class to the `ng-repeat` rows.

* Open **client/assets/templates/app/employees/index.html**
* Find the table row that has contains the `ng-repeat` and add:
```javascript
class="repeated-item fadeable-row"
```
* Now do this for the other tables in the application located in:
  * client/assets/templates/app/projects/index.html
  * client/assets/templates/app/timesheets/detail.html
  * client/assets/templates/app/timesheets/index.html

## Create the style sheet

* Open **client/assets/less/animation/repeat.less**
* First let's add the CSS animations that will change the `opacity` from 1 to 0
* Add the below less to your file:

```css
@keyframes my_animation {
  from { opacity:1; }
  to { opacity:0; }
}

@-webkit-keyframes my_animation {
  from { opacity:1; }
  to { opacity:0; }
}

@-moz-keyframes my_animation {
  from { opacity:1; }
  to { opacity:0; }
}

@-o-keyframes my_animation {
  from { opacity:1; }
  to { opacity:0; }
}
```

* And now we need to set the classes that `ngAnimate` expects
* You'll notice that these classes are appended to the `repeated-item` class that we assigned to our `ng-repeat` items.
  * That's how Angular's animate service knows how to behave.

```css
.repeated-item.ng-enter, .repeated-item.ng-move {
  -webkit-transition:0.5s linear all;
  -moz-transition:0.5s linear all;
  -o-transition:0.5s linear all;
  transition:0.5s linear all;
  opacity:0;
}

.repeated-item.ng-enter.ng-enter-active,
  .repeated-item.ng-move.ng-move-active {
  opacity:1;
}

.repeated-item.ng-leave {
  -webkit-animation:0.5s my_animation;
  -moz-animation:0.5s my_animation;
  -o-animation:0.5s my_animation;
  animation:0.5s my_animation;
}
```

## Test it out!!

* Run your server and open the application.
* Log in and navigate through the app, can you see the fade in/out effect?
* Try changing the CSS animation and see what kind of results you can get.
