define(function (require) {
    var ko = require("knockout"),
        personHelper = require("services/personHelper"),
        communeRepository = require("services/communeRepository");
    require("binding-handlers/optionsLoading");
    require("binding-handlers/radio-a11y");

    function IdentityCardViewModel() {
        this.firstName = ko.observable();
        this.lastName = ko.observable();
        this.birthDate = ko.observable();
        this.birthPlace = ko.observable();
        this.sex = ko.observable();
        this.citizenship = ko.observable();

        this.taxCode = ko.pureComputed(function () {
            return personHelper.calculateTaxCode(
                this.firstName(), this.lastName(), this.sex(),
                this.birthDate() && new Date(this.birthDate()),
                this.birthPlace());
        }, this);
    }

    IdentityCardViewModel.prototype.typeOfSex = [
        { value: 'male',   label: 'Male',   icon: 'fa-male'   },
        { value: 'female', label: 'Female', icon: 'fa-female' }
    ];

    IdentityCardViewModel.prototype.communes = ko.observableArray([]);
    communeRepository.findAll().then(function (data) {
        IdentityCardViewModel.prototype.communes(data);
    });

    IdentityCardViewModel.prototype.textForCommune = function(c) {
        return c.commune + " (" + c.province + ")";
    };

    return IdentityCardViewModel;
});
