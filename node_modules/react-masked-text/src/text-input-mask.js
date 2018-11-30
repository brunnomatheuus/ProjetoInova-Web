import BaseTextComponent from './base-text-component';
import React from 'react'; 

export default class TextInputMask extends BaseTextComponent {

	getElement() {
		return this._input;
	}

	_onChangeText(text) {
		let self = this;

		if (!this._checkText(text)) {
			return;
		}

		self.updateValue(text)
			.then(maskedText => {
				if (self.props.onChangeText) {
					self.props.onChangeText(maskedText);
				}
			});
	}

	_checkText(text) {
		if (this.props.checkText) {
			return this.props.checkText(this.state.value, text);
		}

		return true;
	}

	_propsParsed(props) {
		const newProps = props;
		Object.keys(props).forEach(prop => {
				if (typeof props[prop] === 'boolean') {
					newProps[prop] = props[prop].toString();
				}
			});

		return newProps;
	}

	render() {
		const { value, onChange, onChangeText, ...otherProps } = this.props;
		const parsedProps = this._propsParsed(otherProps);

		return (
			<input
				ref={(ref) => {this._input = ref}}
				onChange={(event) => this._onChangeText(event.currentTarget.value)}
				value={this.state.value}
				{...parsedProps}
			/>
		);
	}
}
