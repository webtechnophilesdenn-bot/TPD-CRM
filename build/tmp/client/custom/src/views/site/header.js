define('custom:views/site/header', ['views/site/header'], function (Dep) {
    
    return Dep.extend({

        setup: function () {
            Dep.prototype.setup.call(this);
            
            // Add theme toggle button
            this.addMenuItem('buttons', {
                name: 'themeToggle',
                html: '<span class="fas fa-moon"></span>',
                title: 'Toggle Theme',
                style: 'default',
                action: 'toggleTheme'
            }, true);
            
            // Set initial icon based on current theme
            this.listenTo(this, 'after:render', () => {
                this.updateThemeIcon();
            });
        },

        actionToggleTheme: function () {
            const currentTheme = this.getConfig().get('theme');
            const newTheme = currentTheme === 'Light' ? 'Dark' : 'Light';
            
            Espo.Ui.notify(this.translate('pleaseWait', 'messages'));
            
            // Save theme preference
            Espo.Ajax.putRequest('Settings', {
                theme: newTheme
            }).then(() => {
                // Update config
                this.getConfig().set('theme', newTheme);
                
                // Update icon
                this.updateThemeIcon();
                
                // Reload page to apply theme
                window.location.reload();
            });
        },

        updateThemeIcon: function () {
            const currentTheme = this.getConfig().get('theme');
            const $icon = this.$el.find('[data-action="toggleTheme"] span');
            
            if (currentTheme === 'Dark') {
                $icon.removeClass('fa-moon').addClass('fa-sun');
                this.$el.find('[data-action="toggleTheme"]').attr('title', 'Switch to Light Theme');
            } else {
                $icon.removeClass('fa-sun').addClass('fa-moon');
                this.$el.find('[data-action="toggleTheme"]').attr('title', 'Switch to Dark Theme');
            }
        }
    });
});
