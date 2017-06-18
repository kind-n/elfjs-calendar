define([
    "./slider.html",
    "../../browser/browser"
], function(template, browser) {

    return Elf.Component("slider", Elf.redactElement(template))(

        Elf.createClass({
            
            get date () {
                var min = this.props.min;
                var max = this.props.max;
                var ere = this.props.prev;
                var end = this.props.next;

                var value = this.props.value;
                var annee = value.getFullYear();
                var month = value.getMonth();

                var fWeek = +(new Date(annee, month + 0, 1).getDay());
                var lWeek = +(new Date(annee, month + 1, 0).getDay());
                var fDate = +(new Date(annee, month + 0, fWeek === 0 ? 1 : 1 - fWeek));
                var lDate = +(new Date(annee, month + 1, lWeek === 6 ? 0 : 6 - lWeek));

                var milli = 1000 * 60 * 60 * 24;
                var clump = [];

                for (; fDate <= lDate; fDate += milli * 7) {
                    clump.push([
                        0, 1, 2, 3, 4, 5, 6
                    ].map(
                        function (item) {
                            return new Date(item * milli + fDate);
                        }
                    ).map(
                        function (item) {
                            return {
                                value : item,
                                state : item.getMonth() != month ? "none" :
                                        item < min || item > max ? "gray" :
                                        item > ere && item < end ? "over" :
                                        item.getTime() === + ere ? "prev" :
                                        item.getTime() === + end ? "next" : "hand"
                            };
                        }
                    ));
                }

                return clump;
            },

            onMouseClick : function (event) {
                if (event.state !== "none" &&
                    event.state !== "gray") {
                    Elf.dispatchEvent(this, Elf.createEvent("ItemClick", true, event.value));
                }
            },

            onMouseEnter : function (event) {
                if (event.state !== "none" &&
                    event.state !== "gray" &&
                    browser.mobile === false) {
                    Elf.dispatchEvent(this, Elf.createEvent("ItemEnter", true, event.value));
                }
            },

            onMouseLeave : function (event) {
                if (event.state !== "none" &&
                    event.state !== "gray" &&
                    browser.mobile === false) {
                    Elf.dispatchEvent(this, Elf.createEvent("ItemLeave", true, event.value));
                }
            }
        })
    );
});