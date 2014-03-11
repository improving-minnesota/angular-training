### timesheet/client/assets/less/animation/repeat.less

```
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

### timesheet/client/assets/templates/app/employees/index.html
### timesheet/client/assets/templates/app/projects/index.html
### timesheet/client/assets/templates/app/timesheets/detail.html
### timesheet/client/assets/templates/app/timesheets/index.html

```
class="repeated-item fadeable-row"
```