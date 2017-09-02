define(function (require) {
    var ko = require("knockout"),
        $ = require("jquery"),
        composition = require("durandal/composition");

    ko.bindingHandlers["loading"] = {
        init: function (element) {
            var $element = $(element),
                loading = $('<div aria-label="Ajax loading data" '+ 'role="progressbar">Loading... '+ '<i class="fa fa-spinner fa-spin fa-2x"'+ 'aria-hidden="true"></i></div>'),
                position = $element.position(),
                $parent = $element.parent();

            loading.css({
                position: "absolute",
                left: position.left + 2, top: position.top + 2,
                width: $parent.width() - 4, height: $parent.height() - 4,
                "text-align": "center", background: "white"
            });

            $element.after(loading);
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.peekObservable(valueAccessor()),
                $element = $(element);

            if (value.length === 0) {
                ko.utils.unwrapObservable(valueAccessor());
            } else {
                $element.next().remove();
                $element.attr('aria-busy', false);
            }
        }
    };
    composition.addBindingHandler("loading");
});
