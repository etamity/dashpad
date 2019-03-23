import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FormGroup } from 'reactstrap';
import { ParseKeyPathVars } from './utils';

import {
    YMLTabsView,
    YMLFormView,
    YMLMarkdownView,
    YMLListView,
    YMLCardHeaderView,
    YMLCardView,
    YMLButtonView,
    YMLRadioView,
    YMLCheckboxView,
    YMLSelectView,
    YMLSwitchView,
    YMLInputView,
    YMLProgressView,
    YMLLinkView,
    YMLTableView,
    YMLTextView,
    YMLHtmlView,
    YMLButtonGroupView,
    YMLRowView,
    YMLContainerView,
    YMLCollapseView
} from './index';

import { ContentType, ContainerType, FieldType, InputType } from './Constants';

const isInputType = type =>
    !!(type && Object.keys(InputType).includes(type.toUpperCase()));

export class YMLComponent extends React.Component {
    render() {
        const { name, type, keyPath, obj } = this.props;
        const uniqueKeyPath = keyPath ? `${keyPath}.${name}` : name;

        ParseKeyPathVars(keyPath, name, obj);
        let newProps = {
            name,
            key: uniqueKeyPath,
            keyPath: uniqueKeyPath,
            type,
            obj,
        };
        if (!obj) {
            return <div />;
        }

        switch (type.toUpperCase()) {
            case ContainerType.COLLAPSE:
                return <YMLCollapseView {...newProps} />;
            case ContainerType.CONTAINER:
                return <YMLContainerView {...newProps} />;
            case ContainerType.TABS:
                return <YMLTabsView {...newProps} />;
            case ContainerType.HEADER:
                return <YMLCardHeaderView {...newProps} />;
            case ContainerType.FORM:
                return <YMLFormView {...newProps} />;
            case ContainerType.BUTTONGROUP:
                return <YMLButtonGroupView {...newProps} />;
            case ContainerType.ROW:
                return <YMLRowView {...newProps} />;
            case ContainerType.CARD:
                return <YMLCardView {...newProps} />;
            case ContentType.LIST:
                return <YMLListView {...newProps} />;
            case ContentType.MARKDOWN:
                return <YMLMarkdownView {...newProps} />;
            case ContentType.LINK:
                return <YMLLinkView {...newProps} />;
            case ContentType.PROGRESS:
                return <YMLProgressView {...newProps} />;
            case ContentType.TABLE:
                return <YMLTableView {...newProps} />;
            case ContentType.TEXT:
                return <YMLTextView {...newProps} />;
            case ContentType.HTML:
                return <YMLHtmlView {...newProps} />;
            case FieldType.INPUT:
                return <YMLInputView {...newProps} />;
            case FieldType.BUTTON:
                return <YMLButtonView {...newProps} />;
            case FieldType.RADIO:
                return <YMLRadioView {...newProps} />;
            case FieldType.CHECKBOX:
                return <YMLCheckboxView {...newProps} />;
            case FieldType.SELECT:
                return <YMLSelectView {...newProps} />;
            case FieldType.SWITCH:
                return <YMLSwitchView {...newProps} />;
            case FieldType.FIELD:
                const subType = isInputType(obj.type)
                    ? FieldType.INPUT
                    : obj.type;
                newProps = { ...this.props, type: subType };
                if (subType.toUpperCase() === FieldType.BUTTON) {
                    return (
                        <FormGroup key={keyPath}>
                            <YMLComponent {...newProps} />
                        </FormGroup>
                    );
                }
                return <YMLComponent {...newProps} />;
            default:
                if (obj.type) {
                    const subType = isInputType(obj.type)
                        ? FieldType.INPUT
                        : obj.type;
                    newProps = { ...this.props, type: subType };
                    if (subType.toUpperCase() === FieldType.BUTTON) {
                        return (
                            <FormGroup key={keyPath}>
                                <YMLComponent {...newProps} />
                            </FormGroup>
                        );
                    }
                    return <YMLComponent {...newProps} />;
                } else {
                    const errMsg = `Warning: ${type} type not found! Path: ${uniqueKeyPath}`;
                    console.error(errMsg);
                    toast.error(errMsg, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    return null;
                }
        }
    }
}

YMLComponent.propTypes = {
    name: PropTypes.string,
    keyPath: PropTypes.string,
    obj: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
};
