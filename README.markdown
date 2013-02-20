## Warning: Discontinued
This project is not maintained anymore. We recommend you to have a look at [FastClick](https://github.com/ftlabs/fastclick) instead.

## Summary
Overrides the click event on mobile devices to fire a click event immediately and get rid of the 300ms delay (webkit for iPhone and Android problem).

touchToClick will fire an artificial `click` event when the `touchend` event is fired and the user hasn't moved since `touchstart`. The original `click` event of the mobile browser will be prevented so that there are not two clicks.

### Usage
Just include the file in your webpage:
```
<script type="application/javascript" src="jquery.touchToClick.js"></script>
```
