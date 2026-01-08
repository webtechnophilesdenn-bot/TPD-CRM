// // ============================================
// // FILE: client/custom/src/views/dashlets/quote-chart.js
// // ============================================
// define('custom:views/dashlets/quote-chart', ['views/dashlets/abstract/base'], function (Dep) {
//     return Dep.extend({
//         name: 'QuoteChart',
        
//         templateContent: `
//             <div class="quote-chart-wrapper" style="padding: 0; background: white; border-radius: 4px; border: 1px solid #e8ebed; overflow: hidden;">
//                 <div style="padding: 16px 20px; border-bottom: 1px solid #e8ebed;">
//                     <h4 style="color: #333; margin: 0; font-weight: 600; font-size: 15px;">
//                         Quote Overview
//                     </h4>
//                 </div>
//                 <div class="chart-container" style="padding: 20px; position: relative; height: 300px; width: 100%;">
//                     <canvas id="quoteCanvas"></canvas>
//                 </div>
//             </div>
//         `,
        
//         _chart: null,
        
//         setup: function () {
//             Dep.prototype.setup.call(this);
//             this.wait(this.loadLibrary());
//         },
        
//         loadLibrary: function () {
//             if (window.Chart) return Promise.resolve();
//             return new Promise((resolve) => {
//                 const script = document.createElement('script');
//                 script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
//                 script.onload = () => setTimeout(resolve, 100);
//                 document.head.appendChild(script);
//             });
//         },
        
//         afterRender: function () {
//             Dep.prototype.afterRender.call(this);
//             setTimeout(() => this.loadData(), 300);
//         },
        
//         loadData: function () {
//             if (!window.Chart) return;
            
//             Espo.Ajax.getRequest('Quote', { maxSize: 200, select: 'status,amount' }).then((resp) => {
//                 const data = resp.list || [];
//                 const counts = {}, totals = {};
                
//                 const colors = ['#F59E0B', '#EF4444', '#10B981', '#6366F1', '#8B5CF6', '#EC4899'];
                
//                 data.forEach(quote => {
//                     const s = quote.status || 'Draft';
//                     counts[s] = (counts[s] || 0) + 1;
//                     totals[s] = (totals[s] || 0) + parseFloat(quote.amount || 0);
//                 });
                
//                 const labels = Object.keys(counts);
//                 const canvas = document.getElementById('quoteCanvas');
//                 if (!canvas) return;
                
//                 const ctx = canvas.getContext('2d');
                
//                 // Destroy existing chart
//                 if (this._chart) {
//                     this._chart.destroy();
//                     this._chart = null;
//                 }
                
//                 // Create new chart with fixed sizing
//                 this._chart = new Chart(ctx, {
//                     type: 'pie',
//                     data: {
//                         labels: labels,
//                         datasets: [{
//                             data: labels.map(l => counts[l]),
//                             backgroundColor: labels.map((_, i) => colors[i % colors.length]),
//                             borderWidth: 2,
//                             borderColor: '#fff',
//                             hoverOffset: 8,
//                             spacing: 2
//                         }]
//                     },
//                     options: {
//                         responsive: true,
//                         maintainAspectRatio: false,
//                         layout: {
//                             padding: {
//                                 top: 10,
//                                 bottom: 10,
//                                 left: 10,
//                                 right: 10
//                             }
//                         },
//                         animation: {
//                             animateRotate: true,
//                             animateScale: true,
//                             duration: 1000,
//                             easing: 'easeInOutQuart'
//                         },
//                         plugins: {
//                             legend: { 
//                                 position: 'bottom',
//                                 labels: { 
//                                     font: { size: 11, weight: '600' },
//                                     padding: 12,
//                                     usePointStyle: true,
//                                     pointStyle: 'circle',
//                                     boxWidth: 8,
//                                     boxHeight: 8,
//                                     color: '#333'
//                                 }
//                             },
//                             tooltip: {
//                                 backgroundColor: 'rgba(0, 0, 0, 0.8)',
//                                 padding: 12,
//                                 titleFont: { size: 13, weight: '600' },
//                                 bodyFont: { size: 12 },
//                                 borderColor: 'rgba(255, 255, 255, 0.1)',
//                                 borderWidth: 1,
//                                 cornerRadius: 4,
//                                 callbacks: {
//                                     label: (ctx) => {
//                                         const label = labels[ctx.dataIndex];
//                                         const count = ctx.parsed;
//                                         const total = ctx.dataset.data.reduce((a,b) => a+b, 0);
//                                         const percentage = ((count / total) * 100).toFixed(1);
//                                         return `${label}: ${count} (${percentage}%)`;
//                                     },
//                                     afterLabel: (ctx) => {
//                                         const amount = totals[labels[ctx.dataIndex]];
//                                         return `Total: ₹${amount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 });
//             }).catch((error) => {
//                 console.error('Error loading quote data:', error);
//             });
//         },
        
//         actionRefresh: function () { 
//             this.reRender(); 
//         },
        
//         onRemove: function () { 
//             if (this._chart) {
//                 this._chart.destroy();
//                 this._chart = null;
//             }
//         }
//     });
// });




// ============================================
// FILE: client/custom/src/views/dashlets/quote-chart.js
// FIXED - Uses quoteDate instead of createdAt
// ============================================
define('custom:views/dashlets/quote-chart', ['views/dashlets/abstract/base'], function (Dep) {
    return Dep.extend({
        name: 'QuoteChart',
        
        templateContent: '<div class="quote-chart-wrapper" style="padding: 0; background: white; border-radius: 4px; border: 1px solid #e8ebed; overflow: hidden;">' +
            '<div style="padding: 16px 20px; border-bottom: 1px solid #e8ebed;">' +
                '<h4 style="color: #333; margin: 0; font-weight: 600; font-size: 15px;">Quote Trends - Last 30 Days</h4>' +
            '</div>' +
            '<div class="chart-container" style="padding: 20px; position: relative; height: 340px; width: 100%;">' +
                '<canvas id="quoteCanvas"></canvas>' +
            '</div>' +
        '</div>',
        
        _chart: null,
        
        setup: function () {
            Dep.prototype.setup.call(this);
            this.wait(this.loadLibrary());
        },
        
        loadLibrary: function () {
            if (window.Chart) return Promise.resolve();
            return new Promise(function(resolve) {
                var script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
                script.onload = resolve;
                document.head.appendChild(script);
            });
        },
        
        afterRender: function () {
            Dep.prototype.afterRender.call(this);
            var self = this;
            setTimeout(function() {
                self.loadData();
            }, 300);
        },
        
        loadData: function () {
            if (!window.Chart) {
                console.error('Chart.js not loaded');
                return;
            }
            
            var self = this;
            var thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            var thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];
            
            Espo.Ajax.getRequest('Quote', { 
                maxSize: 200,
                select: 'quoteDate,status,amount',
                where: [
                    {
                        type: 'after',
                        attribute: 'quoteDate',
                        value: thirtyDaysAgoStr
                    }
                ],
                orderBy: 'quoteDate',
                order: 'asc'
            }).then(function(resp) {
                var data = resp.list || [];
                
                console.log('Quote data received:', data);
                
                if (data.length === 0) {
                    self.showNoData();
                    return;
                }
                
                self.processAndRenderChart(data);
            }).catch(function(error) {
                console.error('Error loading quote data:', error);
                self.showError();
            });
        },
        
        processAndRenderChart: function(quotes) {
            var labels = [];
            var dates = [];
            var today = new Date();
            
            // Create date labels for last 30 days
            for (var i = 29; i >= 0; i--) {
                var date = new Date(today);
                date.setDate(date.getDate() - i);
                dates.push(date.toISOString().split('T')[0]);
                
                var options = { month: 'short', day: 'numeric' };
                labels.push(date.toLocaleDateString('en-US', options));
            }
            
            // Status types to track
            var statusTypes = ['Draft', 'Sent', 'Accepted', 'Rejected'];
            
            // Create datasets for each status
            var datasets = [];
            for (var s = 0; s < statusTypes.length; s++) {
                var status = statusTypes[s];
                datasets.push({
                    label: status,
                    data: new Array(30).fill(0),
                    borderColor: this.getStatusColor(status),
                    backgroundColor: this.getStatusColor(status, 0.1),
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2.5,
                    pointRadius: 3,
                    pointHoverRadius: 6,
                    pointBackgroundColor: this.getStatusColor(status),
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverBorderWidth: 3
                });
            }
            
            // Populate data - count quotes per day per status
            quotes.forEach(function(quote) {
                if (!quote.quoteDate || !quote.status) {
                    return;
                }
                
                var quoteDate = quote.quoteDate;
                var dateIndex = dates.indexOf(quoteDate);
                
                if (dateIndex !== -1) {
                    var statusIndex = statusTypes.indexOf(quote.status);
                    
                    if (statusIndex !== -1) {
                        datasets[statusIndex].data[dateIndex]++;
                    }
                }
            });
            
            this.renderChart(labels, datasets);
        },
        
        getStatusColor: function(status, alpha) {
            if (typeof alpha === 'undefined') alpha = 1;
            
            var colors = {
                'Draft': [245, 158, 11],
                'Sent': [59, 130, 246],
                'Accepted': [16, 185, 129],
                'Rejected': [239, 68, 68]
            };
            
            var color = colors[status] || [149, 165, 166];
            return 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + alpha + ')';
        },
        
        renderChart: function(labels, datasets) {
            var canvas = document.getElementById('quoteCanvas');
            if (!canvas) {
                console.error('Canvas element not found');
                return;
            }
            
            var ctx = canvas.getContext('2d');
            
            if (this._chart) {
                this._chart.destroy();
                this._chart = null;
            }
            
            this._chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    layout: {
                        padding: {
                            top: 10,
                            bottom: 10,
                            left: 10,
                            right: 10
                        }
                    },
                    animation: {
                        duration: 1200,
                        easing: 'easeInOutQuart'
                    },
                    scales: {
                        x: {
                            display: true,
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    size: 11,
                                    weight: '500'
                                },
                                color: '#6b7280',
                                maxRotation: 45,
                                minRotation: 45
                            }
                        },
                        y: {
                            display: true,
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)',
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    size: 11,
                                    weight: '500'
                                },
                                color: '#6b7280',
                                stepSize: 1,
                                callback: function(value) {
                                    return Number.isInteger(value) ? value : '';
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            align: 'center',
                            labels: {
                                font: {
                                    size: 12,
                                    weight: '600',
                                    family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
                                },
                                padding: 15,
                                usePointStyle: true,
                                pointStyle: 'circle',
                                boxWidth: 10,
                                boxHeight: 10,
                                color: '#333'
                            }
                        },
                        tooltip: {
                            enabled: true,
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            padding: 14,
                            titleFont: { size: 13, weight: '700' },
                            bodyFont: { size: 12, weight: '500' },
                            borderColor: 'rgba(255, 255, 255, 0.15)',
                            borderWidth: 1,
                            cornerRadius: 6,
                            displayColors: true,
                            boxWidth: 10,
                            boxHeight: 10,
                            boxPadding: 6,
                            callbacks: {
                                title: function(context) {
                                    return context[0].label;
                                },
                                label: function(context) {
                                    var label = context.dataset.label || '';
                                    var value = context.parsed.y;
                                    return label + ': ' + value + ' quote' + (value !== 1 ? 's' : '');
                                },
                                footer: function(context) {
                                    var total = 0;
                                    for (var i = 0; i < context.length; i++) {
                                        total += context[i].parsed.y;
                                    }
                                    return 'Total: ' + total + ' quote' + (total !== 1 ? 's' : '');
                                }
                            }
                        }
                    }
                }
            });
        },
        
        showNoData: function() {
            var canvas = document.getElementById('quoteCanvas');
            if (!canvas) return;
            
            var parent = canvas.parentElement;
            parent.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #6c757d;">' +
                '<i class="fas fa-file-invoice" style="font-size: 48px; margin-bottom: 12px; opacity: 0.5;"></i>' +
                '<div style="font-size: 14px; font-weight: 500;">No quote data available for the last 30 days</div>' +
                '</div>';
        },
        
        showError: function() {
            var canvas = document.getElementById('quoteCanvas');
            if (!canvas) return;
            
            var parent = canvas.parentElement;
            parent.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #dc3545;">' +
                '<i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 12px; opacity: 0.7;"></i>' +
                '<div style="font-size: 14px; font-weight: 500;">Error loading quote data</div>' +
                '</div>';
        },
        
        actionRefresh: function () {
            this.reRender();
        },
        
        onRemove: function () {
            if (this._chart) {
                this._chart.destroy();
                this._chart = null;
            }
        }
    });
});
