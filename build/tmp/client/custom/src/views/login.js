define('custom:views/login', ['views/login'], function (Dep) {
    
    return Dep.extend({

        template: 'custom:login',

        landingPageData: {
            companyName: 'TPD CRM',
            tagline: 'Enterprise Customer Relationship Management',
            subtitle: 'Streamline Operations • Drive Sales • Delight Customers',
            
            features: [
                {
                    icon: 'fas fa-users',
                    title: 'Contact Management',
                    description: 'Centralized customer database with complete interaction history'
                },
                {
                    icon: 'fas fa-chart-line',
                    title: 'Sales Pipeline',
                    description: 'Track deals from lead to close with visual pipeline management'
                },
                {
                    icon: 'fas fa-file-invoice-dollar',
                    title: 'Invoice & Billing',
                    description: 'Automated invoicing, payment tracking, and financial reporting'
                },
                {
                    icon: 'fas fa-boxes',
                    title: 'Inventory Management',
                    description: 'Real-time stock tracking, product catalog, and order management'
                },
                {
                    icon: 'fas fa-robot',
                    title: 'Workflow Automation',
                    description: 'Automate repetitive tasks and streamline business processes'
                },
                {
                    icon: 'fas fa-chart-pie',
                    title: 'Analytics & Insights',
                    description: 'Powerful dashboards and reports for data-driven decisions'
                }
            ],
            
            stats: [
                { value: '500+', label: 'Active Users' },
                { value: '99.9%', label: 'Uptime' },
                { value: '24/7', label: 'Support' }
            ],
            
            benefits: 'Trusted by businesses worldwide to manage customer relationships, automate sales processes, and drive revenue growth.'
        },

        data: function () {
            var parentData = Dep.prototype.data.call(this);
            
            return Object.assign({}, parentData, {
                logoSrc: this.getLogoSrc(),
                showForgotPassword: this.getConfig().get('passwordRecoveryEnabled'),
                companyName: this.landingPageData.companyName,
                tagline: this.landingPageData.tagline,
                subtitle: this.landingPageData.subtitle,
                features: this.landingPageData.features,
                stats: this.landingPageData.stats,
                benefits: this.landingPageData.benefits
            });
        }

    });
});
