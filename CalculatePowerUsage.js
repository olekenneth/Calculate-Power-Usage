(function(window, $) {
    var PowerCalc;

    PowerCalc = function() {
        this.defaults = {
            someKey: 'someValue'
        };
        this.options = null;
    };

    $.extend(PowerCalc.prototype, {
        init: function(options) {
            if (typeof options != 'undefined') {
                this.options = $.extend(this.defaults, options);
            } else {
                this.options = this.defaults;
            }
        }
    });

    window.PowerCalc = PowerCalc;
})(this, jQuery);

var PowerCalc = new window.PowerCalc();
PowerCalc.init();
