(function(window, $, _, Backbone) {
    var PowerCalc;

    PowerCalc = function(options) {
        this.defaults = {
            fields: [
                {
                    name: 'totalkWh',
                    placeholder: 'Total kWh',
                    type: 'text',
                    pattern: "[0-9]*"
                },
                {
                    name: 'renterskWh',
                    placeholder: 'Renters kWh',
                    type: 'text',
                    pattern: "[0-9]*"
                },
                {
                    name: 'costkWh',
                    placeholder: 'Cost per kWh',
                    type: "number",
                    step: 0.01

                }
            ],
            heading: "Please input data",
            appendTo: $(".form-powercalc")
        };

        this.options = null;

        if (typeof options != 'undefined') {
            this.options = $.extend(this.defaults, options);
        } else {
            this.options = this.defaults;
        }

        this.model = new Backbone.Model();

        this.model.on('change', this.render, this);

        $("<h2/>")
            .addClass("form-powercalc-heading")
            .html(this.options.heading)
            .appendTo(this.options.appendTo);

        $.each(this.options.fields, $.proxy(function(i, field) {
            var label = $("<label/>")
                    .appendTo(this.options.appendTo);

            var input = $("<input/>")
                    .addClass("input-block-level")
                    .attr("id", field["name"])
                    .on("change keyup", $.proxy(this, "setValue"));

            for(var key in field) {
                input.attr(key, field[key]);
            }

            input.appendTo(label);
        }, this));

        this.values = $("<div/>").appendTo(this.options.appendTo);

    };

    _.extend(PowerCalc.prototype, {
        setValue: function(event) {
            this.model.set(event.target.name,  event.target.value);
        },

        updateValues: function() {
            this.values.html("Totalt cost: " + this.model.get('totalCost') + "<br/>Renters cost: " + this.model.get('rentersCost') + "<br/>Owners cost: " + this.model.get('ownersCost'));
        },

        render: function() {
            this.model.set('totalCost', this.calcCost(this.model.get('totalkWh'), this.model.get('costkWh')));
            this.model.set('rentersCost', this.calcCost(this.model.get('renterskWh'), this.model.get('costkWh')));
            this.model.set('ownersCost', (this.model.get('totalCost') - this.model.get('rentersCost')).toFixed(2));
            this.updateValues();
        },

        calcCost: function(kWh, cost) {
            if (!kWh) kWh = "0.0";
            if (!cost) cost = "0.0";
            cost = cost.replace(",", ".");
            cost = cost / 100;

            return (cost * kWh).toFixed(2);
        }
    });

    window.PowerCalc = PowerCalc;
})(this, jQuery, _, Backbone);

new window.PowerCalc();
new window.PowerCalc();
