// ============================================
// FILE: client/custom/src/views/dashlets/ticket-stats-chart.js
// FIXED VERSION - Respects maxSize limit and CSP
// ============================================
define('custom:views/dashlets/ticket-stats-chart', ['views/dashlets/abstract/base'], function (Dep) {
    return Dep.extend({
        name: 'TicketStatsChart',
        
        templateContent: `
            <div class="ticket-stats-wrapper" style="padding: 0; background: white; border-radius: 4px; border: 1px solid #e8ebed; overflow: hidden;">
                <div style="padding: 16px 20px; border-bottom: 1px solid #e8ebed;">
                    <h4 style="color: #333; margin: 0; font-weight: 600; font-size: 15px;">
                        Ticket Trends - Last 30 Days
                    </h4>
                </div>
                <div class="chart-container" style="padding: 20px; position: relative; height: 340px; width: 100%;">
                    <canvas id="ticketStatsCanvas"></canvas>
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
                script.onload = resolve;
                document.head.appendChild(script);
            });
        },
        
        afterRender: function () {
            Dep.prototype.afterRender.call(this);
            setTimeout(() => this.loadData(), 300);
        },
        
        loadData: function () {
            if (!window.Chart) {
                console.error('Chart.js not loaded');
                return;
            }
            
            // Get tickets from last 30 days with maxSize limit of 200
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            Espo.Ajax.getRequest('Ticket', { 
                maxSize: 200,
                select: 'createdAt,status',
                where: [
                    {
                        type: 'after',
                        attribute: 'createdAt',
                        value: thirtyDaysAgo.toISOString()
                    }
                ],
                orderBy: 'createdAt',
                order: 'desc'
            }).then((resp) => {
                const data = resp.list || [];
                
                if (data.length === 0) {
                    this.showNoData();
                    return;
                }
                
                this.processAndRenderChart(data);
            }).catch(error => {
                console.error('Error loading ticket data:', error);
                this.showError();
            });
        },
        
        processAndRenderChart: function(tickets) {
            // Create date labels for last 30 days
            const labels = [];
            const dates = [];
            const today = new Date();
            
            for (let i = 29; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                dates.push(date.toISOString().split('T')[0]);
                
                const options = { month: 'short', day: 'numeric' };
                labels.push(date.toLocaleDateString('en-US', options));
            }
            
            // Count tickets by status for each day
            const statusTypes = ['New', 'In Progress', 'Resolved', 'Closed'];
            const datasets = statusTypes.map(status => ({
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
            }));
            
            // Count tickets for each day and status
            tickets.forEach(ticket => {
                const ticketDate = new Date(ticket.createdAt).toISOString().split('T')[0];
                const dateIndex = dates.indexOf(ticketDate);
                
                if (dateIndex !== -1) {
                    const status = ticket.status || 'New';
                    const datasetIndex = statusTypes.indexOf(status);
                    
                    if (datasetIndex !== -1) {
                        datasets[datasetIndex].data[dateIndex]++;
                    }
                }
            });
            
            this.renderChart(labels, datasets);
        },
        
        getStatusColor: function(status, alpha) {
            if (typeof alpha === 'undefined') alpha = 1;
            
            const colors = {
                'New': [52, 152, 219],
                'Assigned': [93, 173, 226],
                'In Progress': [243, 156, 18],
                'On Hold': [149, 165, 166],
                'Waiting for Customer': [189, 195, 199],
                'Resolved': [39, 174, 96],
                'Closed': [127, 140, 141],
                'Reopened': [231, 76, 60],
                'Cancelled': [192, 57, 43]
            };
            
            const color = colors[status] || [149, 165, 166];
            return 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + alpha + ')';
        },
        
        renderChart: function(labels, datasets) {
            const canvas = document.getElementById('ticketStatsCanvas');
            if (!canvas) {
                console.error('Canvas element not found');
                return;
            }
            
            const ctx = canvas.getContext('2d');
            
            // Destroy existing chart
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
                                    const label = context.dataset.label || '';
                                    const value = context.parsed.y;
                                    return label + ': ' + value + ' ticket' + (value !== 1 ? 's' : '');
                                },
                                footer: function(context) {
                                    let total = 0;
                                    for (let i = 0; i < context.length; i++) {
                                        total += context[i].parsed.y;
                                    }
                                    return 'Total: ' + total + ' ticket' + (total !== 1 ? 's' : '');
                                }
                            }
                        }
                    }
                }
            });
        },
        
        showNoData: function() {
            const canvas = document.getElementById('ticketStatsCanvas');
            if (!canvas) return;
            const parent = canvas.parentElement;
            parent.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #6c757d;"><i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 12px; opacity: 0.5;"></i><div style="font-size: 14px; font-weight: 500;">No ticket data available for the last 30 days</div></div>';
        },
        
        showError: function() {
            const canvas = document.getElementById('ticketStatsCanvas');
            if (!canvas) return;
            const parent = canvas.parentElement;
            parent.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #dc3545;"><i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 12px; opacity: 0.7;"></i><div style="font-size: 14px; font-weight: 500;">Error loading ticket data</div></div>';
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
