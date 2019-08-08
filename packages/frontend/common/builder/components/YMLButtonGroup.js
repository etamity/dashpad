import React from 'react';
import {
    Row,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    FormGroup,
    DropdownToggle,
    DropdownMenu,
} from 'reactstrap';
import { ButtonGroupType, FieldType } from './Constants';
import { YMLButtonView } from './index';
import { YMLBase } from './YMLBase';

export class YMLButtonGroupView extends YMLBase {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
        };
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    render() {
        const { keyPath, obj } = this.props;
        const { dropdownOpen } = this.state;
        const childrenButtons =
            obj.items &&
            obj.items.map((item, index) => (
                <YMLButtonView
                    key={keyPath + index}
                    name={'items.' + index}
                    keyPath={keyPath + '.items.' + index}
                    type={FieldType.BUTTON.toLowerCase()}
                    obj={{
                        ...item,
                        type: obj.type,
                        onClick: item.onClick || obj.onClick,
                        className: item.className || obj.childClassName,
                    }}
                />
            ));
        let ButtonGroupContainer = null;
        switch (obj.type && obj.type.toUpperCase()) {
            case ButtonGroupType.GROUP:
                ButtonGroupContainer = (
                    <ButtonGroup className={obj.className}>
                        {childrenButtons}
                    </ButtonGroup>
                );
                break;
            case ButtonGroupType.TOOLBAR:
                ButtonGroupContainer = (
                    <ButtonToolbar>
                        <ButtonGroup className={obj.className}>
                            {childrenButtons}
                        </ButtonGroup>
                        ;
                    </ButtonToolbar>
                );
                break;
            case ButtonGroupType.DROPDOWN:
                ButtonGroupContainer = (
                    <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>{obj.label}</DropdownToggle>
                        <DropdownMenu>{childrenButtons}</DropdownMenu>
                    </ButtonDropdown>
                );
                break;
            case ButtonGroupType.WRAP:
                ButtonGroupContainer = <Row>{childrenButtons}</Row>;
                break;
            default:
                ButtonGroupContainer = (
                    <ButtonGroup className={obj.className}>
                        {childrenButtons}
                    </ButtonGroup>
                );
        }
        return <FormGroup>{ButtonGroupContainer}</FormGroup>;
    }
}
