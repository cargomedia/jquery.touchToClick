/*
 * Author: cargomedia.ch
 * Based on: https://developers.google.com/mobile/articles/fast_buttons
 *
 * Binds 'touchstart' when binding $.on('click')
 * and triggers 'click' when 'touchend' happens without 'touchmove' inbetween.
 */
(function($) {
	if (!("ontouchstart" in window)) {
		return;
	}

	var clickbuster = {
		coordinates: [],
		push: function(x, y) {
			this.coordinates.push(x, y);
			var clickbuster = this;
			window.setTimeout(function() {
				clickbuster.pop();
			}, 1000);
		},
		pop: function() {
			this.coordinates.splice(0, 2);
		},
		onClick: function(event) {
			for (var i = 0; i < this.coordinates.length; i += 2) {
				var x = this.coordinates[i];
				var y = this.coordinates[i + 1];
				if (Math.abs(event.screenX - x) < 25 && Math.abs(event.screenY - y) < 25) {
					event.stopPropagation();
					event.preventDefault();
				}
			}
		}
	};
	document.addEventListener('click', function(e) {
		if (!e.isTouchEvent) {
			clickbuster.onClick(e);
		}
	}, true);

	$.event.special.click = {
		delegateType: "click",
		bindType: "click",
		setup: function(data, namespaces, eventHandle) {
			var element = this;
			var touchHandler = {
				handleEvent: function(e) {
					switch(e.type) {
						case 'touchstart': this.onTouchStart(e); break;
						case 'touchmove': this.onTouchMove(e); break;
						case 'touchend': this.onTouchEnd(e); break;
					}
				},
				onTouchStart: function(e) {
					e.stopPropagation();
					this.moved = false;
					this.startX = e.touches[0].pageX;
					this.startY = e.touches[0].pageY;
					element.addEventListener('touchmove', this, false);
					element.addEventListener('touchend', this, false);
				},
				onTouchMove: function(e) {
					this.moved = true;
				},
				onTouchEnd: function(e) {
					element.removeEventListener('touchmove', this, false);
					element.removeEventListener('touchend', this, false);

					if (!this.moved) {
						var theEvent = document.createEvent('MouseEvents');
						theEvent.initEvent('click', true, true);
						theEvent.isTouchEvent = true;
						e.target.dispatchEvent(theEvent);

						e.stopPropagation();
						clickbuster.push(this.startX, this.startY);
					}
				}
			};

			element.addEventListener('touchstart', touchHandler, false);

			$(element)
				.data('touchToClick-handler', touchHandler)
				.css({'-webkit-tap-highlight-color': 'transparent'});

			return false;
		},
		teardown: function(namespaces) {
			var element = this;
			var touchHandler = $(element).data('touchToClick-handler');
			element.removeEventListener('touchstart', touchHandler, false);

			return false;
		}
	};
})(jQuery);
