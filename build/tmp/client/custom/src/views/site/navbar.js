define('custom:views/site/navbar', ['views/site/navbar'], function (Dep) {

    return Dep.extend({

        setup: function () {
            Dep.prototype.setup.call(this);
            
            // Add theme toggle to item list
            this.itemList.push('themeToggle');
        },

        getItemDefs: function (name) {
            if (name === 'themeToggle') {
                return {
                    view: 'custom:views/navbar/theme-toggle',
                    class: 'theme-toggle-item',
                    order: 100 // Places it at the end
                };
            }
            
            return Dep.prototype.getItemDefs.call(this, name);
        },

        createItemView: function (name) {
            if (name === 'themeToggle') {
                return this.createView('themeToggleItem', 'custom:views/navbar/theme-toggle', {
                    selector: '[data-item="themeToggle"]'
                });
            }
            
            return Dep.prototype.createItemView.call(this, name);
        }

    });
});