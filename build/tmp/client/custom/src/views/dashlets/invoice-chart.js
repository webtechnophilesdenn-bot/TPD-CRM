
// ============================================
// FILE 3: invoice-chart.js
// ============================================
define('custom:views/dashlets/invoice-chart', ['views/dashlets/abstract/base'], function (Dep) {
    return Dep.extend({
        name: 'InvoiceChart',
        templateContent: `
            <div style="padding: 0; background: white; border-radius: 4px; border: 1px solid #e8ebed;">
                <div style="padding: 16px 20px; border-bottom: 1px solid #e8ebed;">
                    <h4 style="color: #333; margin: 0; font-weight: 600; font-size: 15px;">
                        Invoice Statistics
                    </h4>
                </div>
                <div style="padding: 20px; height: 300px;">
                    <canvas id="invoiceCanvas"></canvas>
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
            
            Espo.Ajax.getRequest('Invoice', { maxSize: 200, select: 'status,amount' }).then((resp) => {
                const data = resp.list || [];
                const counts = {}, totals = {};
                
                const blueShades = ['#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF', '#1E3A8A'];
                
                data.forEach(inv => {
                    const s = inv.status || 'Draft';
                    counts[s] = (counts[s] || 0) + 1;
                    totals[s] = (totals[s] || 0) + parseFloat(inv.amount || 0);
                });
                
                const labels = Object.keys(counts);
                const canvas = document.getElementById('invoiceCanvas');
                if (!canvas) return;
                
                const ctx = canvas.getContext('2d');
                if (this._chart) this._chart.destroy();
                
                this._chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Invoice Count',
                            data: labels.map(l => counts[l]),
                            backgroundColor: labels.map((_, i) => blueShades[i % blueShades.length]),
                            borderWidth: 0,
                            borderRadius: 3,
                            borderSkipped: false
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: {
                            duration: 1000,
                            easing: 'easeInOutQuart'
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
                                displayColors: false,
                                callbacks: {
                                    label: (ctx) => 'Count: ' + ctx.parsed.x,
                                    afterLabel: (ctx) => 'Total: Rs.' + totals[labels[ctx.dataIndex]].toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})
                                }
                            }
                        },
                        scales: { 
                            x: { 
                                beginAtZero: true,
                                grid: { 
                                    color: '#f0f1f3',
                                    drawBorder: false,
                                    lineWidth: 1
                                },
                                ticks: { 
                                    font: { size: 11 },
                                    padding: 8,
                                    color: '#6c757d'
                                },
                                border: { display: false }
                            },
                            y: {
                                grid: { display: false },
                                ticks: { 
                                    font: { size: 11, weight: '500' },
                                    padding: 8,
                                    color: '#6c757d'
                                }
                            }
                        }
                    }
                });
            });
        },
        
        actionRefresh: function () { this.reRender(); },
        onRemove: function () { if (this._chart) this._chart.destroy(); }
    });
});