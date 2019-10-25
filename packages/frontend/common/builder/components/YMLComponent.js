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
    YMLCardFooterView,
    YMLJsonSchemaView,
    YMLCardView,
    YMLButtonView,
    YMLBadgeView,
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
    YMLCollapseView,
    YMLSlotView,
    YMLFieldView,
    YMLCodeEditorView,
    YMLAlertView,
    YMLListItemView,
} from './index';

import {
    ContentType,
    ContainerType,
    FieldType,
    isInputType,
} from './Constants';

export class YMLComponent extends React.Component {
    render() {
        const { name, type, keyPath, obj } = this.props;
        if (!obj || !!obj.hidden) {
            return <React.Fragment />;
        }

        const uniqueKeyPath = keyPath ? `${keyPath}.${name}` : name;
        let newProps = {
            name,
            key: uniqueKeyPath,
            keyPath: uniqueKeyPath,
            type,
            obj: ParseKeyPathVars(keyPath, obj),
        };

        switch (type.toUpperCase()) {
            case ContainerType.COLLAPSE:
                return <YMLCollapseView {...newProps} />;
            case ContainerType.ALERT:
                return <YMLAlertView {...newProps} />;
            case ContainerType.CONTAINER:
                return <YMLContainerView {...newProps} />;
            case ContainerType.TABS:
                return <YMLTabsView {...newProps} />;
            case ContainerType.HEADER:
                return <YMLCardHeaderView {...newProps} />;
            case ContainerType.FOOTER:
                return <YMLCardFooterView {...newProps} />;
            case ContainerType.FORM:
                return <YMLFormView {...newProps} />;
            case ContainerType.BUTTONGROUP:
                return <YMLButtonGroupView {...newProps} />;
            case ContainerType.ROW:
                return <YMLRowView {...newProps} />;
            case ContainerType.CARD:
            case ContainerType.TAB:
                return <YMLCardView {...newProps} />;
            case ContainerType.SLOT:
                return <YMLSlotView {...newProps} />;
            case ContentType.LIST:
                return <YMLListView {...newProps} />;
            case ContentType.LISTITEM:
                return <YMLListItemView {...newProps} />;
            case ContentType.BADGE:
                return <YMLBadgeView {...newProps} />;
            case ContentType.JSONSCHEMA:
                return <YMLJsonSchemaView {...newProps} />;
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
                return <YMLFieldView {...newProps} />;
            case ContentType.CODE:
                return <YMLCodeEditorView {...newProps} />;
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
