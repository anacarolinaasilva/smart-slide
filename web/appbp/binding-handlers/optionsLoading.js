define(function (require) {
    var ko = require("knockout"),
        $ = require("jquery"),
        composition = require("durandal/composition");
    require("binding-handlers/loading");

    composition.addBindingHandler("optionsLoading", {
        init: function () {
            ko.bindingHandlers.loading.init.apply(this, arguments);
            ko.bindingHandlers.options.init.apply(this, arguments);
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.peekObservable(valueAccessor()),
                $element = $(element);

            if (value.length === 0) {
                ko.utils.unwrapObservable(valueAccessor());
            } else {
                ko.bindingHandlers.options.update.apply(this, arguments);
                $element.next().remove();
            }
        }
    });
});
