define(["plugins/router", "knockout"], function (router, ko) {
    var childRouter = router.createChildRouter().makeRelative({
        moduleId: "viewmodels/relocate",
        fromParent: true
    }).map([
        {
            route: ["", "fill-the-form"], moduleId: "fill-the-form",
            title: "Insert your information", nav: true,
            hash: "relocate/fill-the-form"
        }, {
            route: "sign-and-send", moduleId: "sign-and-send",
            title: "Sign the module and send it", nav: true
        }, {
            route: "wait-45-days", moduleId: "wait-45-days",
            title: "Check your new address", nav: true
        }
    ]).buildNavigationModel();

    return {
        router: childRouter
    }
});
