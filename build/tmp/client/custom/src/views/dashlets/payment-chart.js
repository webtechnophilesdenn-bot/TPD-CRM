// ============================================
// FILE 1: payment-chart.js
// ============================================
define('custom:views/dashlets/payment-chart', ['views/dashlets/abstract/base'], function (Dep) {
    return Dep.extend({
        name: 'PaymentChart',
        templateContent: `
            <div style="padding: 0; background: white; border-radius: 4px; border: 1px solid #e8ebed;">
                <div style="padding: 16px 20px; border-bottom: 1px solid #e8ebed;">
                    <h4 style="color: #333; margin: 0; font-weight: 600; font-size: 15px;">
                        Payment Distribution
                    </h4>
                </div>
                <div style="padding: 20px; height: 300px; display: flex; align-items: center; justify-content: center;">
                    <canvas id="paymentCanvas"></canvas>
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
            
            Espo.Ajax.getRequest('Payment', { maxSize: 200, select: 'status,amount' }).then((resp) => {
                const data = resp.list || [];
                const counts = {}, totals = {};
                
                const colorMap = {
                    'Pending': '#FDB32A',
                    'Completed': '#3D9970',
                    'Failed': '#FF6B6B'
                };
                
                data.forEach(pay => {
                    const s = pay.status || 'Pending';
                    if (s === 'Pending' || s === 'Completed' || s === 'Failed') {
                        counts[s] = (counts[s] || 0) + 1;
                        totals[s] = (totals[s] || 0) + parseFloat(pay.amount || 0);
                    }
                });
                
                const labels = Object.keys(counts);
                const canvas = document.getElementById('paymentCanvas');
                if (!canvas) return;
                
                const ctx = canvas.getContext('2d');
                if (this._chart) this._chart.destroy();
                
                this._chart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: labels.map(l => counts[l]),
                            backgroundColor: labels.map(l => colorMap[l] || '#95a5a6'),
                            borderWidth: 0,
                            hoverOffset: 8,
                            spacing: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        aspectRatio: 1.3,
                        animation: {
                            animateRotate: true,
                            animateScale: true,
                            duration: 1000,
                            easing: 'easeInOutQuart'
                        },
                        plugins: {
                            legend: { 
                                position: 'bottom',
                                labels: { 
                                    font: { size: 11, weight: '600' },
                                    padding: 12,
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                    boxWidth: 8,
                                    boxHeight: 8,
                                    color: '#333'
                                }
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                padding: 12,
                                titleFont: { size: 13, weight: '600' },
                                bodyFont: { size: 12 },
                                borderColor: 'rgba(255, 255, 255, 0.1)',
                                borderWidth: 1,
                                cornerRadius: 4,
                                callbacks: {
                                    label: (ctx) => {
                                        const label = labels[ctx.dataIndex];
                                        const count = ctx.parsed;
                                        const percentage = ((count / ctx.dataset.data.reduce((a,b) => a+b, 0)) * 100).toFixed(1);
                                        return label + ': ' + count + ' (' + percentage + '%)';
                                    },
                                    afterLabel: (ctx) => 'Amount: Rs.' + totals[labels[ctx.dataIndex]].toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})
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