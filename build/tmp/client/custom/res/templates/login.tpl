<div class="custom-login-container">
    <!-- Left Side - CRM Information -->
    <div class="login-left-panel">
        <div class="login-info-content">
            <!-- Branding Section -->
            <div class="branding-section">
                <div class="brand-header">
                    <h1 class="crm-title">{{companyName}}</h1>
                    <p class="crm-tagline">{{tagline}}</p>
                    <p class="crm-subtitle">{{subtitle}}</p>
                </div>
            </div>
            
            <!-- Features Grid -->
            <div class="features-section">
                <h3 class="section-title">What We Provide</h3>
                <div class="features-grid">
                    {{#each features}}
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="{{icon}}"></i>
                        </div>
                        <div class="feature-content">
                            <h4 class="feature-title">{{title}}</h4>
                            <p class="feature-description">{{description}}</p>
                        </div>
                    </div>
                    {{/each}}
                </div>
            </div>
            
            <!-- Stats Section -->
            <div class="stats-section">
                {{#each stats}}
                <div class="stat-item">
                    <div class="stat-value">{{value}}</div>
                    <div class="stat-label">{{label}}</div>
                </div>
                {{/each}}
            </div>
            
            <!-- Benefits -->
            <div class="benefits-section">
                <p class="benefits-text">{{benefits}}</p>
            </div>
        </div>
    </div>
    
    <!-- Right Side - Login Form -->
    <div class="login-right-panel">
        <div class="login-form-wrapper">
            <div id="login" class="panel panel-default">
                <div class="panel-heading">
                    <div class="logo-container">
                        <img src="{{logoSrc}}" class="logo" alt="Logo">
                    </div>
                    <h4 class="login-heading">Welcome Back</h4>
                    <p class="login-subheading">Sign in to access your dashboard</p>
                </div>
                
                <div class="panel-body">
                    <div>
                        <form id="login-form" onsubmit="return false;">
                            <div class="form-group">
                                <label for="field-userName">
                                    <i class="fas fa-user"></i> {{translate 'Username'}}
                                </label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    id="field-userName" 
                                    class="form-control" 
                                    autocapitalize="off" 
                                    autocorrect="off" 
                                    tabindex="1" 
                                    autocomplete="username"
                                    placeholder="Enter your username"
                                >
                            </div>
                            
                            <div class="form-group">
                                <label for="field-password">
                                    <i class="fas fa-lock"></i> {{translate 'Password'}}
                                </label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="field-password" 
                                    class="form-control" 
                                    tabindex="2" 
                                    autocomplete="current-password"
                                    placeholder="Enter your password"
                                >
                            </div>
                            
                            <div class="margin-top-2x">
                                <button 
                                    type="submit" 
                                    class="btn btn-primary btn-block btn-login" 
                                    id="btn-login" 
                                    tabindex="3"
                                >
                                    <i class="fas fa-sign-in-alt"></i> {{translate 'Login' scope='User'}}
                                </button>
                            </div>
                            
                            {{#if showForgotPassword}}
                            <div class="text-center margin-top">
                                <a 
                                    href="javascript:" 
                                    class="forgot-password-link" 
                                    data-action="passwordChangeRequest" 
                                    tabindex="4"
                                >
                                    <i class="fas fa-question-circle"></i> {{translate 'Forgot Password?' scope='User'}}
                                </a>
                            </div>
                            {{/if}}
                        </form>
                    </div>
                </div>
                
                <div class="panel-footer">
                    <div class="security-badge">
                        <i class="fas fa-shield-alt"></i>
                        <span>Secure Login • SSL Encrypted</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<footer class="container-fluid">{{{footer}}}</footer>
