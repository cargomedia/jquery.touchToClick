## Problem and solution 
Problem with delayed (300ms) click event after touchend event on mobile devices have been solved by triggering click event right after touchstart and preventing the original click to be fired.

Technically all the click events are globally blocked after touchend (which prevents the delayed click).
Additionally lock is released after 2000ms to enable click triggers from the code.


## Usage
To enable the fix you only need to include the script. It will automatically affect all your touch events.

