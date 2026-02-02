import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({
  title,
  subtitle,
  breadcrumbs = [],
  actions = [],
  className = '',
}) => {
  return (
    <header className={`bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="w-full px-4  py-6 sm:py-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 overflow-x-auto pb-2">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.path || crumb.label}>
                {crumb.path ? (
                  <a
                    href={crumb.path}
                    className="hover:text-primary dark:hover:text-primary transition-colors whitespace-nowrap"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-gray-900 dark:text-white font-medium whitespace-nowrap">
                    {crumb.label}
                  </span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mx-1.5 sm:mx-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        
        {/* Title and Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white break-words">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Actions */}
          {actions.length > 0 && (
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'primary'}
                  size={action.size || 'medium'}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  isLoading={action.isLoading}
                  className="text-sm sm:text-base"
                >
                  {action.icon && <span className="mr-1 sm:mr-2">{action.icon}</span>}
                  <span className="hidden sm:inline">{action.label}</span>
                  <span className="sm:hidden">{action.label?.split(' ')[0]}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
    })
  ),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.string,
      size: PropTypes.string,
      disabled: PropTypes.bool,
      isLoading: PropTypes.bool,
      icon: PropTypes.node,
    })
  ),
  className: PropTypes.string,
};

export default Header;