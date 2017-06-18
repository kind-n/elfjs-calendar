/// <reference path="./node_modules/elfjs/lib/elf.d.ts" />
/// <reference path="./node_modules/moment/moment.d.ts" />

Elf.set("moment", moment);
Elf.set("Swiper", Swiper);

Elf.config({

    baseURL : "/",

    defaultExtension : "js"

});

Elf.require("./main").then(function (Main) {
    var view = Elf.render(
        Elf.createElement(Main, {
            onFlushView : onFlushView
        }), document.querySelector(".x-container")
    );
    function onFlushView () {
        view.forceUpdate ();
    }
});