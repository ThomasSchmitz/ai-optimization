/**
 * Error Handler Utility
 * Centralized error handling and user notifications
 */

(function() {
    'use strict';

    class ErrorHandler {
        static show(message, type = 'error', duration = 5000) {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.setAttribute('role', 'alert');
            notification.setAttribute('aria-live', 'assertive');
            
            const icon = this.getIcon(type);
            const messageSpan = document.createElement('span');
            messageSpan.textContent = message;
            
            notification.innerHTML = `${icon} `;
            notification.appendChild(messageSpan);
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'notification-close';
            closeBtn.setAttribute('aria-label', 'Close notification');
            closeBtn.innerHTML = '&times;';
            closeBtn.onclick = () => notification.remove();
            notification.appendChild(closeBtn);
            
            let container = document.querySelector('.notification-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'notification-container';
                document.body.appendChild(container);
            }
            
            container.appendChild(notification);
            
            if (duration > 0) {
                setTimeout(() => {
                    notification.classList.add('notification-fade-out');
                    setTimeout(() => notification.remove(), 300);
                }, duration);
            }
            
            return notification;
        }

        static getIcon(type) {
            const icons = {
                'error': '❌',
                'warning': '⚠️',
                'success': '✅',
                'info': 'ℹ️'
            };
            return icons[type] || icons['info'];
        }

        static handle(error, context = 'Application', showUser = true) {
            if (this.isDevelopment()) {
                console.error(`[${context}] Error:`, error);
            }
            
            if (showUser) {
                const userMessage = this.getUserMessage(context, error);
                this.show(userMessage, 'error');
            }
        }

        static getUserMessage(context, error) {
            const messages = {
                'fetch': 'Unable to load content. Please check your connection.',
                'search': 'Search is temporarily unavailable.',
                'includes': 'Loading components...',
                'form': 'Problem submitting form. Please try again.',
                'network': 'Network error. Please check your connection.'
            };
            
            if (error instanceof TypeError) return messages['network'];
            return messages[context] || 'An error occurred. Please try again.';
        }

        static isDevelopment() {
            return window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1';
        }

        static showLoading(message = 'Loading...') {
            let loader = document.querySelector('.global-loader');
            if (!loader) {
                loader = document.createElement('div');
                loader.className = 'global-loader';
                loader.setAttribute('role', 'status');
                loader.innerHTML = `
                    <div class="loader-spinner"></div>
                    <div class="loader-message">${message}</div>
                `;
                document.body.appendChild(loader);
            }
            loader.style.display = 'flex';
            return loader;
        }

        static hideLoading() {
            const loader = document.querySelector('.global-loader');
            if (loader) loader.style.display = 'none';
        }
    }

    if (typeof window !== 'undefined') {
        window.AI_GEO = window.AI_GEO || {};
        window.AI_GEO.ErrorHandler = ErrorHandler;
    }

})();
