// Dependencies

import React, {PropTypes} from 'react';
import find from 'lodash/collection/find';
import result from 'lodash/object/result';
import assign from 'object-assign';

// Components
import {component as Autocomplete} from '../../autocomplete/field';
import InputText from '../../../components/input/text';
import {component as DisplayText} from '../../display/text';
import SelectClassic from '../../../components/input/select';
import {component as Label} from '../../label';

// Mixins
import fieldGridBehaviourMixin from '../../mixin/field-grid-behaviour';

const fieldBuiltInComponentsMixin = {
    mixins: [fieldGridBehaviourMixin],
    getDefaultProps() {
        return {
            /**
            * Does the component has a Label.
            * @type {Boolean}
            */
            hasLabel: true,
            /**
            * Redefine complety the component.
            * @type {Object}
            */
            FieldComponent: undefined,
            /**
            * Redefine only the input and label component.
            * @type {Object}
            */
            InputLabelComponent: undefined,
            /**
            * Component for the input.
            * @type {Object}
            */
            InputComponent: InputText,
            /**
             * Autocomplete component
             * @type {Object}
             */
            AutocompleteComponent: Autocomplete,
            /**
            * Component for the select.
            * @type {Object}
            */
            SelectComponent: SelectClassic,
            /**
            * Component for the display.
            * @type {Object}
            */
            DisplayComponent: DisplayText,
            /**
            * Component for the label.
            * @type {Object}
            */
            LabelComponent: Label
        };
    },
    /** @inheriteDoc */
    propTypes: {
        AutocompleteComponent: PropTypes.func,
        DisplayComponent: PropTypes.func,
        FieldComponent: PropTypes.func,
        InputComponent: PropTypes.func,
        InputLabelComponent: PropTypes.func,
        LabelComponent: PropTypes.func,
        SelectComponent: PropTypes.func,
        hasLabel: PropTypes.bool,
        labelSize: PropTypes.number
    },
    _buildStyle() {
        let {style} = this.props;
        style = style || {};
        style.className = style && style.className ? style.className : '';
        return style;
    },
    /**
    * Render the label part of the component.
    * @returns {Component} - The builded label component.
    */
    label() {
        const {name, label, LabelComponent, domain} = this.props;
        return (
            <div
                className ={`${this._getLabelGridClassName()}`}
                data-focus='field-label-container'
            >
                <LabelComponent
                    domain={domain}
                    name={name}
                    text={label}
                />
            </div>
        );
    },
    /**
    * Rendet the input part of the component.
    * @return {Component} - The constructed input component.
    */
    input() {
        const {name: id, label: placeHolder} = this.props;
        const {value, error} = this.state;
        const {onInputChange: onChange} = this;
        const inputBuildedProps = assign({}, this.props, {
            id,
            onChange,
            value,
            error,
            placeHolder,
            ref: 'input'
        });
        return <this.props.InputComponent {...inputBuildedProps}/>;
    },
    /**
     * Autocomplete render
     * @return {JSX} rendered component
     */
    autocomplete() {
        const {name: id, label: placeHolder} = this.props;
        const {value, error} = this.state;
        const {onInputChange: onChange} = this;
        const inputBuildedProps = {
            ...this.props,
            id,
            onChange,
            value,
            error,
            placeHolder,
            ref: 'input'
        };
        return <this.props.AutocompleteComponent {...inputBuildedProps}/>;
    },
    /**
     * Build a select component depending on the domain, definition and props.
     * @return {Component} - The builded select component.
     */
    select() {
        const {error, value} = this.state;
        const buildedSelectProps = assign({}, this.props, {
            value,
            style: this._buildStyle(),
            onChange: this.onInputChange,
            ref: 'input',
            error
        });
        return <this.props.SelectComponent {...buildedSelectProps} />;
    },
    /**
    * Render the display part of the component.
    * @return {object} - The display part of the compoennt if the mode is not edit.
    */
    display() {
        const {value} = this.state;
        const {name, valueKey, labelKey, values} = this.props;
        const _processValue = values ? result(find(values, {[valueKey || 'code']: value}), labelKey || 'label') : value;
        const buildedDislplayProps = assign({}, this.props, {
            id: name,
            style: this._buildStyle(),
            value: _processValue,
            ref: 'display'
        });
        return <this.props.DisplayComponent {...buildedDislplayProps}/>;
    },
    /**
    * Render the error part of the component.
    * @return {object} - The error part of the component.
    */
    error() {
        let {error} = this.state;
        if (error) {
            return (
                <span className='mdl-textfield__error'>
                    {error}
                </span>
            );
        }
    },
    /**
    * Render the help component.
    * @return {object} - The help part of the component.
    */
    help() {
        let {help, name} = this.props;
        if (help) {
            return (
                <label
                    className='mdl-textfield__label'
                    htmFor={`${name}`}
                >
                    {help}
                </label>
            );
        }
    },
    /**
     * Render the field component if it is overriden in the component definition.
     * @return {Component} - The builded field component.
     */
    _renderFieldComponent() {
        const FieldComponent = this.props.FieldComponent || this.props.InputLabelComponent;
        const {value, error} = this.state;
        const buildedProps = assign({}, this.props, {
            id: this.props.name,
            value: value,
            error: error,
            onChange: this.onInputChange,
            ref: 'input'
        });
        return <FieldComponent {...buildedProps} />;
    }
};

export default fieldBuiltInComponentsMixin;
