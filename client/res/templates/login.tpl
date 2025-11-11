<div class="custom-login-container">
    <!-- Left Side - CRM Information -->
    <div class="login-left-panel">
        <div class="login-content">
            <div class="logo-section">
                <img src="{{logoSrc}}" class="main-logo" alt="Logo">
            </div>
            
            <div class="welcome-text">
                <h1>Welcome to TPD-CRM</h1>
                <p class="subtitle">Your Complete Business Management Solution</p>
            </div>

            <div class="features-section">
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="feature-text">
                        <h3>Powerful Analytics</h3>
                        <p>Track your business performance with real-time insights and detailed reports</p>
                    </div>
                </div>

                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="feature-text">
                        <h3>Customer Management</h3>
                        <p>Manage your customers, contacts, and relationships all in one place</p>
                    </div>
                </div>

                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-file-invoice-dollar"></i>
                    </div>
                    <div class="feature-text">
                        <h3>Smart Invoicing</h3>
                        <p>Create, send, and track invoices with automated payment reminders</p>
                    </div>
                </div>

                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-tasks"></i>
                    </div>
                    <div class="feature-text">
                        <h3>Task Automation</h3>
                        <p>Streamline your workflow with automated tasks and notifications</p>
                    </div>
                </div>
            </div>

            <div class="stats-section">
                <div class="stat-item">
                    <h2>10K+</h2>
                    <p>Active Users</p>
                </div>
                <div class="stat-item">
                    <h2>50K+</h2>
                    <p>Companies</p>
                </div>
                <div class="stat-item">
                    <h2>99.9%</h2>
                    <p>Uptime</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="login-right-panel">
        <div class="login-form-container">
            <div class="login-form-header">
                <h2>Sign In</h2>
                <p>Enter your credentials to access your account</p>
            </div>

            <div id="login" class="login-form-wrapper">
                <div class="">
                    <form id="login-form">
                        {{#if hasSignIn}}
                        <div class="cell" data-name="sign-in">
                            {{#if hasFallback}}
                            <div class="pull-right">
                                <a
                                    role="button"
                                    tabindex="0"
                                    class="btn btn-link btn-icon"
                                    data-action="showFallback"
                                ><span class="fas fa-chevron-down"></span></a>
                            </div>
                            {{/if}}
                            <button
                                class="btn btn-default btn-x-wide"
                                id="sign-in"
                                type="button"
                            >{{signInText}}</button>
                        </div>
                        {{/if}}

                        <div class="form-group cell" data-name="username">
                            <label for="field-userName">{{translate 'Username'}}</label>
                            <div class="input-with-icon">
                                <i class="fas fa-user"></i>
                                <input
                                    type="text"
                                    name="username"
                                    id="field-userName"
                                    class="form-control"
                                    autocapitalize="off"
                                    spellcheck="false"
                                    tabindex="1"
                                    autocomplete="username"
                                    maxlength="255"
                                    placeholder="Enter your username"
                                >
                            </div>
                        </div>

                        <div class="form-group cell" data-name="password">
                            <label for="field-password">{{translate 'Password'}}</label>
                            <div class="input-with-icon" data-role="password-input-container">
                                <i class="fas fa-lock"></i>
                                <input
                                    type="password"
                                    name="password"
                                    id="field-password"
                                    class="form-control"
                                    tabindex="2"
                                    autocomplete="current-password"
                                    maxlength="255"
                                    placeholder="Enter your password"
                                >
                                <a
                                    role="button"
                                    data-action="toggleShowPassword"
                                    class="password-toggle"
                                    title="{{translate 'View'}}"
                                ><span class="far fa-eye"></span></a>
                            </div>
                        </div>

                        {{#if anotherUser}}
                        <div class="form-group cell">
                            <label>{{translate 'Log in as'}}</label>
                            <div>{{anotherUser}}</div>
                        </div>
                        {{/if}}

                        <div class="form-group cell remember-section">
                            <label class="checkbox-label">
                                <input type="checkbox" id="remember-me">
                                <span>Remember me</span>
                            </label>
                        </div>

                        <div class="cell" data-name="submit">
                            <button
                                type="submit"
                                class="btn btn-primary btn-login"
                                id="btn-login"
                                tabindex="3"
                            >{{logInText}}</button>
                        </div>

                        {{#if showForgotPassword}}
                        <div class="cell forgot-password-section">
                            <a
                                role="button"
                                class="forgot-password-link"
                                data-action="passwordChangeRequest"
                                tabindex="4"
                            >{{translate 'Forgot Password?' scope='User'}}</a>
                        </div>
                        {{/if}}
                    </form>

                    <div class="login-footer">
                        <p>Don't have an account? <a href="#" class="signup-link">Contact Sales</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<footer>{{{footer}}}</footer>