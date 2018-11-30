import BaseMask from './_base.mask';
const { parseStringDate } = require('./internal-dependencies/date-parser.js');

const DATETIME_MASK_SETTINGS = {
    format: 'DD/MM/YYYY HH:mm:ss',
};

export class DatetimeMask extends BaseMask {
    static getType() {
        return 'datetime';
    }

    getValue(value, settings) {
        let mergedSettings = this._getMergedSettings(settings);
		let mask = '';

		for(var i = 0; i < mergedSettings.format.length; i++) {
			mask += mergedSettings.format[i].replace( /[a-zA-Z]+/g, '9');
		}

		return this.getVMasker().toPattern(value, mask);
    }

    getRawValue(maskedValue, settings) {
        let mergedSettings = this._getMergedSettings(settings);
        return parseStringDate(maskedValue, mergedSettings.format);
    }

    validate(value, settings) {
        const maskedValue = this.getValue(value, settings);
        const mergedSettings = this._getMergedSettings(settings);
        const date = parseStringDate(maskedValue, mergedSettings.format);
        const isValid = this._isValidDate(date);
        return isValid;
    }

    _getMergedSettings(settings) {
        return super.mergeSettings(DATETIME_MASK_SETTINGS, settings);
    }

    /** https://stackoverflow.com/a/1353711/3670829 */
    _isValidDate(d) {
        return d instanceof Date && !isNaN(d);
    }
}