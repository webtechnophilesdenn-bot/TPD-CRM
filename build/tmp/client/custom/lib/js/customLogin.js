// Custom login page JavaScript
// Add any custom login page interactions here

(function() {
    'use strict';
    
    // Add smooth focus effects
    document.addEventListener('DOMContentLoaded', function() {
        const inputs = document.querySelectorAll('#login-form input');
        
        inputs.forEach(function(input) {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    });
    
})();
