define('custom:views/ticket/list', ['views/list'], function (Dep) {
    return Dep.extend({
        setup: function () {
            Dep.prototype.setup.call(this);
            
            this.menu.buttons.unshift({
                label: 'Create Ticket',
                style: 'primary',
                action: 'createTicket',
                acl: 'create'
            });
        },

        actionCreateTicket: function () {
            this.createView('quickCreate', 'views/modals/edit', {
                scope: 'Ticket',
                attributes: {
                    status: 'New',
                    priority: 'Medium'
                }
            }, function (view) {
                view.render();
                view.notify('Creating new ticket...');
            });
        }
    });
});