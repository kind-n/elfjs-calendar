define([
    "moment"
], function(moment) {
    return Elf.Transform("format")(
        
        Elf.createClass({

            transform : function (value, expr) {
                return moment(value).format(expr);
            }
        })
    );
});