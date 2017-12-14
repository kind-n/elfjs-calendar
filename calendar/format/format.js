define([
    "moment"
], function(moment) {
    return Elf.Transform("format", {
        transform : function (value, expr) {
            return moment(value).format(expr);
        }
    });
});