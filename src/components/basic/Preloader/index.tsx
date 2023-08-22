import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import background from '../../../images/background.svg';
import backgroundDark from '../../../images/05.png';

import messages from './messages';
import staticStyles from './style';

interface PreloaderProps {
  withText?: boolean;
  caption?: string;
  subCaption?: string;
  subDescription?: string;
  smallSize?: boolean;
  forwardRef?: React.Ref<any>;
  withBackground?: boolean;
}

export default function Preloader({
  withText,
  caption,
  subCaption,
  subDescription,
  smallSize,
  forwardRef,
  withBackground,
}: PreloaderProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  return (
    <div
      className={classNames('Preloader', {
        PreloaderSmall: smallSize,
        Preloader__withBackground: withBackground,
      })}
      ref={forwardRef}
    >
      {withText && (
        <div className="Preloader__text">
          <h4>{intl.formatMessage(messages.caption)}</h4>
          <p>{intl.formatMessage(messages.description)}</p>
        </div>
      )}

      {!!caption && (
        <div className="Preloader__text">
          <h4>{caption}</h4>
        </div>
      )}

      <div className="Preloader__dots">
        <div className="Preloader__dot" />
        <div className="Preloader__dot" />
        <div className="Preloader__dot" />
        <div className="Preloader__dot" />
      </div>

      {!!subCaption && !!subDescription && (
        <div className="Preloader__sub-text">
          <h4>{subCaption}</h4>
          <p>{subDescription}</p>
        </div>
      )}

      {withBackground && (
        <img
          style={{ opacity: 0.5 }}
          className="Preloader__background"
          src={isCurrentThemeDark ? backgroundDark : background}
          alt=""
        />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .Preloader {
          &__withBackground {
            background: #000;
            z-index: 1;
          }

          &__text {
            h4 {
              color: ${currentTheme.primary.hex};
            }
            p {
              color: ${currentTheme.textDarkBlue.hex};
            }
          }

          &__dot {
            background: #bd2626;

            &:nth-child(1) {
              animation: animation 3s linear infinite 0s;
            }
            &:nth-child(2) {
              animation: animation 3s linear infinite 0.15s;
            }
            &:nth-child(3) {
              animation: animation 3s linear infinite 0.3s;
            }
            &:nth-child(4) {
              animation: animation 3s linear infinite 0.45s;
            }
          }

          &__sub-text {
            h4 {
              color: ${currentTheme.primary.hex};
            }
            p {
              color: ${currentTheme.textDarkBlue.hex};
            }
          }
        }

        @keyframes animation {
          0% {
            opacity: 0;
            transform: scale(0.5);
            background: #bd2626;
          }
          25% {
            opacity: 1;
            transform: scale(1.25);
            background: #1c1ab7;
          }
          50% {
            opacity: 0;
            transform: scale(0.5);
            background: #bd2626;
          }
          75% {
            opacity: 1;
            transform: scale(1.25);
            background: #1c1ab7;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
