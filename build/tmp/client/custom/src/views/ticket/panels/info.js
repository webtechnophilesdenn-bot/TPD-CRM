define('custom:views/ticket/panels/info', ['views/record/panels/side'], function (Dep) {
    return Dep.extend({
        
        template: 'custom:ticket/panels/info',
        
        data: function () {
            const responseTime = this.model.get('responseTime');
            const resolutionTime = this.model.get('resolutionTime');
            const reopenCount = this.model.get('reopenCount') || 0;
            
            return {
                responseTimeFormatted: responseTime ? this.formatTime(responseTime) : 'Not responded',
                resolutionTimeFormatted: resolutionTime ? this.formatTime(resolutionTime) : 'Not resolved',
                reopenCount: reopenCount,
                isOverdue: this.isOverdue(),
                dueDate: this.model.get('dueDate'),
                dueDateFormatted: this.formatDueDate(),
                isEscalated: this.model.get('isEscalated'),
                status: this.model.get('status'),
                priority: this.model.get('priority')
            };
        },
        
        formatTime: function(minutes) {
            if (!minutes) return 'N/A';
            if (minutes < 60) {
                return Math.round(minutes) + ' min';
            } else if (minutes < 1440) {
                return Math.round(minutes / 60) + ' hrs';
            } else {
                return Math.round(minutes / 1440) + ' days';
            }
        },
        
        formatDueDate: function() {
            const dueDate = this.model.get('dueDate');
            if (!dueDate) return 'Not set';
            
            const date = new Date(dueDate);
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        },
        
        isOverdue: function() {
            const dueDate = this.model.get('dueDate');
            const status = this.model.get('status');
            
            if (!dueDate || status === 'Closed' || status === 'Resolved') {
                return false;
            }
            
            return new Date(dueDate) < new Date();
        },
        
        setup: function() {
            Dep.prototype.setup.call(this);
            
            this.listenTo(this.model, 'change', function() {
                this.reRender();
            });
        }
        
    });
});
