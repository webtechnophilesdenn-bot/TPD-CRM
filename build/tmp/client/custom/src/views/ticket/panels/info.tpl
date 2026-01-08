<div class="ticket-info-panel">
    <style>
        .ticket-info-panel {
            padding: 0;
        }
        .info-section {
            padding: 16px;
            border-bottom: 1px solid #e8ebed;
        }
        .info-section:last-child {
            border-bottom: none;
        }
        .info-title {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            color: #8b95a5;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
        }
        .info-value {
            font-size: 14px;
            font-weight: 600;
            color: #333;
        }
        .info-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }
        .badge-overdue {
            background: #fee2e2;
            color: #dc2626;
        }
        .badge-on-time {
            background: #d1fae5;
            color: #059669;
        }
        .badge-escalated {
            background: #fef3c7;
            color: #d97706;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }
        .info-metric {
            text-align: center;
            padding: 12px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .metric-value {
            font-size: 24px;
            font-weight: 700;
            color: #3b82f6;
            margin-bottom: 4px;
        }
        .metric-label {
            font-size: 11px;
            color: #6b7280;
            text-transform: uppercase;
            font-weight: 600;
        }
    </style>
    
    <!-- Due Date Status -->
    {{#if dueDate}}
    <div class="info-section">
        <div class="info-title">Due Date Status</div>
        <div class="info-value">
            {{dueDateFormatted}}
            {{#if isOverdue}}
                <span class="info-badge badge-overdue">
                    <i class="fas fa-exclamation-triangle"></i> Overdue
                </span>
            {{else}}
                <span class="info-badge badge-on-time">
                    <i class="fas fa-check-circle"></i> On Time
                </span>
            {{/if}}
        </div>
    </div>
    {{/if}}
    
    <!-- Escalation Status -->
    {{#if isEscalated}}
    <div class="info-section">
        <div class="info-title">Escalation Status</div>
        <div class="info-value">
            <span class="info-badge badge-escalated">
                <i class="fas fa-arrow-up"></i> Escalated
            </span>
        </div>
    </div>
    {{/if}}
    
    <!-- Time Metrics -->
    <div class="info-section">
        <div class="info-title">Response & Resolution Time</div>
        <div class="info-grid">
            <div class="info-metric">
                <div class="metric-value">{{responseTimeFormatted}}</div>
                <div class="metric-label">Response</div>
            </div>
            <div class="info-metric">
                <div class="metric-value">{{resolutionTimeFormatted}}</div>
                <div class="metric-label">Resolution</div>
            </div>
        </div>
    </div>
    
    <!-- Reopen Count -->
    <div class="info-section">
        <div class="info-title">Reopen Count</div>
        <div class="info-value">
            <span style="font-size: 20px; font-weight: 700; {{#if reopenCount}}color: #f59e0b;{{else}}color: #10b981;{{/if}}">
                {{reopenCount}}
            </span>
            {{#if reopenCount}}
                <span style="font-size: 12px; color: #6b7280; margin-left: 8px;">times reopened</span>
            {{else}}
                <span style="font-size: 12px; color: #6b7280; margin-left: 8px;">never reopened</span>
            {{/if}}
        </div>
    </div>
</div>
