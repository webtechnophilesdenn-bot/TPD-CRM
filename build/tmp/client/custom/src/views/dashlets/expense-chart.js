define('custom:views/dashlets/expense-chart', ['views/dashlets/abstract/base'], function (Dep) {
    return Dep.extend({
        name: 'ExpenseChart',
        templateContent: `
            <div style="padding: 0; background: white; border-radius: 4px; border: 1px solid #e8ebed;">
                <div style="padding: 16px 20px; border-bottom: 1px solid #e8ebed;">
                    <h4 style="color: #333; margin: 0; font-weight: 600; font-size: 15px;">
                        Expense by Category
                    </h4>
                </div>
                <div style="padding: 20px; height: 300px;">
                    <canvas id="expenseCanvas"></canvas>
                </div>
            </div>
        `,
        _chart: null,
        
        setup: function () {
            Dep.prototype.setup.call(this);
            this.wait(this.loadLibrary());
        },
        
        loadLibrary: function () {
            if (window.Chart) return Promise.resolve();
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
                script.onload = () => setTimeout(resolve, 100);
                document.head.appendChild(script);
            });
        },
        
        afterRender: function () {
            Dep.prototype.afterRender.call(this);
            setTimeout(() => this.loadData(), 200);
        },
        
        loadData: function () {
            if (!window.Chart) return;
            
            // Request category and amount fields - maxSize limit is 200
            Espo.Ajax.getRequest('Expense', { 
                maxSize: 200, 
                select: 'category,amount'
            }).then((resp) => {
                const data = resp.list || [];
                
                console.log('Expense data received:', data); // Debug log
                
                if (data.length === 0) {
                    this.showNoData();
                    return;
                }
                
                const categoryTotals = {};
                const categoryCounts = {};
                
                // Process each expense - filter out null/empty values
                data.forEach(exp => {
                    // Skip if category or amount is missing
                    if (!exp.category || exp.amount === null || exp.amount === undefined) {
                        return;
                    }
                    
                    const category = exp.category;
                    const amount = parseFloat(exp.amount || 0);
                    
                    if (!categoryTotals[category]) {
                        categoryTotals[category] = 0;
                        categoryCounts[category] = 0;
                    }
                    
                    categoryTotals[category] += amount;
                    categoryCounts[category] += 1;
                });
                
                console.log('Category totals:', categoryTotals); // Debug log
                console.log('Category counts:', categoryCounts); // Debug log
                
                // Sort by amount (highest first)
                const sortedCategories = Object.keys(categoryTotals).sort((a, b) => {
                    return categoryTotals[b] - categoryTotals[a];
                });
                
                this.renderChart(sortedCategories, categoryTotals, categoryCounts);
            }).catch(error => {
                console.error('Error loading expense data:', error);
                this.showError();
            });
        },
        
        renderChart: function(labels, totals, counts) {
            const canvas = document.getElementById('expenseCanvas');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (this._chart) this._chart.destroy();
            
            // Color palette for categories
            const colors = [
                '#34D399', // Green
                '#60A5FA', // Blue
                '#F59E0B', // Amber
                '#EC4899', // Pink
                '#8B5CF6', // Purple
                '#EF4444', // Red
                '#14B8A6', // Teal
                '#F97316', // Orange
                '#6366F1'  // Indigo
            ];
            
            this._chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total Amount (₹)',
                        data: labels.map(l => totals[l]),
                        backgroundColor: labels.map((_, i) => colors[i % colors.length]),
                        borderWidth: 0,
                        borderRadius: 3,
                        barThickness: 40,
                        maxBarThickness: 60
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutQuart'
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    plugins: { 
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            titleFont: { size: 13, weight: '600' },
                            bodyFont: { size: 12 },
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            borderWidth: 1,
                            cornerRadius: 4,
                            callbacks: {
                                title: (ctx) => {
                                    return labels[ctx[0].dataIndex];
                                },
                                label: (ctx) => {
                                    return `Amount: ₹${ctx.parsed.y.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                                },
                                afterLabel: (ctx) => {
                                    const category = labels[ctx.dataIndex];
                                    return `Count: ${counts[category]} expense${counts[category] > 1 ? 's' : ''}`;
                                }
                            }
                        }
                    },
                    scales: { 
                        y: { 
                            beginAtZero: true,
                            grid: { 
                                color: '#f0f1f3',
                                drawBorder: false,
                                lineWidth: 1
                            },
                            ticks: { 
                                font: { size: 11 },
                                padding: 8,
                                color: '#6c757d',
                                callback: (val) => '₹' + val.toLocaleString('en-IN')
                            },
                            border: { display: false }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { 
                                font: { size: 11 },
                                padding: 8,
                                color: '#6c757d',
                                maxRotation: 45,
                                minRotation: 0
                            }
                        }
                    }
                }
            });
        },
        
        showNoData: function() {
            const canvas = document.getElementById('expenseCanvas');
            if (!canvas) return;
            
            const parent = canvas.parentElement;
            parent.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #6c757d; font-size: 14px;">No expense data available</div>';
        },
        
        showError: function() {
            const canvas = document.getElementById('expenseCanvas');
            if (!canvas) return;
            
            const parent = canvas.parentElement;
            parent.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #dc3545; font-size: 14px;">Error loading expense data</div>';
        },
        
        actionRefresh: function () { this.reRender(); },
        onRemove: function () { if (this._chart) this._chart.destroy(); }
    });
});