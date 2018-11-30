import React, { Component } from 'react';
import MaskResolver from './mask-resolver';

export default class BaseTextComponent extends Component {
    constructor(props) {
        super(props);

        this._resolveMaskHandler(props.kind);
        const value = this._getDefaultMaskedValue(props.value);
        this.state = { value };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.kind !== nextProps.kind) {
            this._resolveMaskHandler(nextProps.kind);
        }
        return true;
    }

    updateValue(text) {
        let self = this;

        return new Promise((resolve, reject) => {
            let maskedText = self._getMaskedValue(text);

			if(this.state.value !== maskedText) {
				self.setState({
					value: maskedText
				}, () => {
					resolve(maskedText);
				});
			}
			else {
				resolve(this.state.value);
			}
        });
    }

    isValid() {
        return this._maskHandler.validate(
            this._getDefaultValue(this.state.value),
            this.state.options
        );
    }

    getRawValue() {
        return this._maskHandler.getRawValue(
            this._getDefaultValue(this.state.value),
            this.state.options
        );
    }

    _resolveMaskHandler(kind) {
        this._maskHandler = MaskResolver.resolve(kind);
    }

	_getDefaultMaskedValue(value) {
		if (this._getDefaultValue(value) === '') {
			return ''
		}

		return this._getMaskedValue(value)
	}

    _getMaskedValue(value) {
        let oldValue = this.state && this.value;

        return this._maskHandler.getValue(
            this._getDefaultValue(value),
            this.props.options,
            oldValue);
	}

    _getDefaultValue(value) {
		if(value === undefined || value === null) {
			return '';
		}

		return value;
	}
}
