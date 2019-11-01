import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

import configs from "../utils/configs";
import styles from "../assets/stylesheets/sign-in-dialog.scss";
import DialogContainer from "./dialog-container";
import { handleTextFieldFocus, handleTextFieldBlur } from "../utils/focus-utils";

export default class SignInDialog extends Component {
  static propTypes = {
    authStarted: PropTypes.bool,
    authComplete: PropTypes.bool,
    onSignIn: PropTypes.func,
    onContinue: PropTypes.func,
    message: PropTypes.string,
    continueText: PropTypes.string,
    closable: PropTypes.bool
  };

  static defaultProps = {
    closable: true
  };

  state = {
    email: ""
  };

  onSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onSignIn(this.state.email);
  };

  render() {
    let contents;
    if (this.props.authStarted) {
      contents = (
        <p>
          <FormattedMessage className="preformatted" id="sign-in.auth-started" />
        </p>
      );
    } else if (this.props.authComplete) {
      contents = (
        <div className={styles.signInComplete}>
          <p>{this.props.message}</p>
          <button onClick={this.props.onContinue} className={styles.continueButton}>
            {this.props.continueText}
          </button>
        </div>
      );
    } else {
      contents = (
        <form onSubmit={this.onSubmit} className={styles.signInForm}>
          <span>{this.props.message}</span>
          <input
            name="email"
            type="email"
            required
            placeholder="Your email address"
            value={this.state.email}
            onFocus={e => handleTextFieldFocus(e.target)}
            onBlur={() => handleTextFieldBlur()}
            onChange={e => this.setState({ email: e.target.value })}
            className={styles.emailField}
          />
          {(configs.feature("show_terms") || configs.feature("show_privacy")) && (
            <p className={styles.terms}>
              By proceeding, you agree to the{" "}
              {configs.feature("show_terms") && (
                <>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={configs.link("terms_of_use", "https://github.com/mozilla/hubs/blob/master/TERMS.md")}
                  >
                    terms of use
                  </a>{" "}
                </>
              )}
              {configs.feature("show_terms") && configs.feature("show_privacy") && "and "}
              {configs.feature("show_privacy") && (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={configs.link("privacy_notice", "https://github.com/mozilla/hubs/blob/master/PRIVACY.md")}
                >
                  privacy notice
                </a>
              )}.
            </p>
          )}
          <button type="submit" className={styles.nextButton}>
            next
          </button>
        </form>
      );
    }

    return (
      <DialogContainer title="Sign In" {...this.props}>
        {contents}
      </DialogContainer>
    );
  }
}
