/// <reference path="./node_modules/elfjs/lib/elf.d.ts" />
/// <reference path="./node_modules/moment/moment.d.ts" />

Elf.set("moment", moment);
Elf.set("Swiper", Swiper);

Elf.config({

    baseURL : "/",

    defaultExtension : "js"

});

Elf.require("./main").then(function (Main) {
    Elf.render(
        Elf.createElement(Main), document.querySelector(".x-container"), true
    );
});