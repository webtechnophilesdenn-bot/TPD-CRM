define('custom:views/ticket/detail', ['views/detail'], function (Dep) {
    return Dep.extend({
        setup: function () {
            Dep.prototype.setup.call(this);
            
            this.listenTo(this.model, 'change:status', function () {
                this.handleStatusChange();
            }, this);
        },

        handleStatusChange: function () {
            var status = this.model.get('status');
            if (status === 'Closed') {
                this.notify('Ticket has been closed', 'success');
            } else if (status === 'In Progress') {
                this.notify('Ticket is now being processed', 'info');
            }
        }
    });
});