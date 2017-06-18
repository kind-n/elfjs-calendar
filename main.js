define([
    "./calendar/calendar"
], function(Calendar) {

    return Elf.createClass({

        constructor () {
            var now    = new Date();

            this.min   = new Date(now.getFullYear() + 0, now.getMonth(), now.getDate());
            this.max   = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

            this.prev  = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
            this.next  = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8);

            this.value = new Date(now.getFullYear(), now.getMonth(), 1);

            this.phase = true;
            this.milli = 1000 * 60 * 60 * 24;

            this.tPrev = this.prev;
            this.tNext = this.next;
        },

        render : function () {
            // JSX
            //     <Calendar min={this.min}
            //               max={this.max}
            //               prev={this.prev}
            //               next={this.next}
            //               onSlidePrev={this.onSlidePrev.bind(this)}
            //               onSlideNext={this.onSlideNext.bind(this)}
            //               onItemClick={this.onItemClick.bind(this)}
            //               onItemEnter={this.onItemEnter.bind(this)}
            //               onItemLeave={this.onItemLeave.bind(this)} />

            // Template
            //     <calendar min="{{min}}"
            //               max="{{max}}"
            //               prev="{{prev}}"
            //               next="{{next}}"
            //               onslideprev="onSlidePrev($event)"
            //               onslidenext="onSlideNext($event)"
            //               onitemclick="onItemClick($event)"
            //               onitementer="onItemEnter($event)"
            //               onitemleave="onItemEnter($event)" />

            // Virtual DOM
            return Elf.createElement(Calendar, {

                min         : this.min,
                max         : this.max,
                prev        : this.tPrev,
                next        : this.tNext,
                value       : this.value,

                onSlidePrev : this.onSlidePrev.bind(this),
                onSlideNext : this.onSlideNext.bind(this),
                onItemClick : this.onItemClick.bind(this),
                onItemEnter : this.onItemEnter.bind(this),
                onItemLeave : this.onItemLeave.bind(this)
            });
        },

        onSlidePrev : function (event) {
            this.value.setMonth(this.value.getMonth() - 1);
        },

        onSlideNext : function (event) {
            this.value.setMonth(this.value.getMonth() + 1);
        },

        onItemClick : function (event) {
            if (this.phase) {
                if (!(event.value >= this.max)) {
                    this.prev = event.value;
                    if (!(this.prev < this.next)) {
                        this.next = new Date(this.prev.getTime() + this.milli);
                    }
                }
            } else {
                if (!(event.value <= this.min)) {
                    this.next = event.value;
                    if (!(this.next > this.prev)) {
                        this.prev = new Date(this.next.getTime() - this.milli);
                    }
                }
            }
            this.phase = !this.phase;
            this.tPrev = this.prev;
            this.tNext = this.next;
            Elf.dispatchEvent(this, Elf.createEvent("FlushView", true));
        },

        onItemEnter : function (event) {
            if (this.phase) {
                if (!(event.value >= this.max)) {
                    this.tPrev = event.value;
                    if (!(this.tPrev < this.tNext)) {
                        this.tNext = new Date(this.tPrev.getTime() + this.milli);
                    }
                }
            } else {
                if (!(event.value <= this.min)) {
                    this.tNext = event.value;
                    if (!(this.tNext > this.tPrev)) {
                        this.tPrev = new Date(this.tNext.getTime() - this.milli);
                    }
                }
            }
            Elf.dispatchEvent(this, Elf.createEvent("FlushView", true));
        },

        onItemLeave : function (event) {
            this.tPrev = this.prev;
            this.tNext = this.next;
            Elf.dispatchEvent(this, Elf.createEvent("FlushView", true));
        }
    });
});