define([
    "Swiper",
    "./slider/slider",
    "./format/format",
    "./calendar.html"
], function(Swiper, slider, format, template) {

    return Elf.Component("calendar", {

        render : Elf.redactElement(template, slider, format),
        
        get minMonth () {
            return trunMonth(this.props.min);
        },

        get maxMonth () {
            return trunMonth(this.props.max);
        },

        get nowMonth () {
            return trunMonth(this.props.value);
        },

        get prevMonth () {
            return !(this.nowMonth <= this.minMonth)
                 ? !(this.nowMonth >= this.maxMonth)
                 ? plusMonth(this.nowMonth, -1)
                 : plusMonth(this.nowMonth, -2)
                 : this.nowMonth;
        },

        get leadMonth () {
            return plusMonth(this.prevMonth, +1);
        },

        get nextMonth () {
            return plusMonth(this.leadMonth, +1);
        },

        get through () {
            return this.minMonth <= this.maxMonth
                 ? (this.maxMonth.getFullYear() * 12 + this.maxMonth.getMonth())
                 - (this.minMonth.getFullYear() * 12 + this.minMonth.getMonth())
                 + 1
                 : 3;
        },

        get initialSlide () {
            return this.nowMonth.getTime() === this.prevMonth.getTime() ? 0 : 1;
        },

        onInitial : function () {
            this.swiper = new Swiper(this.refs.swiper, {
                initialSlide       : this.initialSlide,
                onTouchStart       : this.onFlushView.bind(this),
                onSlidePrevEnd     : this.onFlushView.bind(this),
                onSlideNextEnd     : this.onFlushView.bind(this),
                onSlidePrevStart   : this.onSlidePrev.bind(this),
                onSlideNextStart   : this.onSlideNext.bind(this),
                runCallbacksOnInit : false
            });
        },

        onDispose : function () {
            this.swiper.destroy(true);
        },

        onClickPrev : function () {
            this.swiper.emit("onTouchStart", this.swiper);
            this.swiper.slidePrev(true);
        },

        onClickNext : function () {
            this.swiper.emit("onTouchStart", this.swiper);
            this.swiper.slideNext(true);
        },

        onSlidePrev : function () {
            Elf.dispatchEvent(this, Elf.createEvent("SlidePrev", true));
        },

        onSlideNext : function () {
            Elf.dispatchEvent(this, Elf.createEvent("SlideNext", true));
        },

        onFlushView : function () {
            if (!(this.nowMonth <= this.minMonth) &&
                !(this.nowMonth >= this.maxMonth)) {
                this.swiper.slideTo(1, 0, false);
            }
        }
    });


    function trunMonth (value) {
        return value ? new Date(value.getFullYear(), value.getMonth(), 1) : void 0;
    }
    function plusMonth (value, plusMonthValue) {
        return new Date(value.getFullYear(), value.getMonth() + plusMonthValue, 1);
    }
});