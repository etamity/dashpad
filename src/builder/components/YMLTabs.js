import React from 'react';
import { YMLComponent } from './YMLComponent';
import TabView from 'components/TabView';
import { getTypes } from './utils';
import { YMLBase } from './YMLBase';
import { PropsFilter, EventsHook } from './utils';
import { UIEvent } from './Constants';

const allowedProps = [
    'disabled',
    'data-',
];

const allowedEvents = [
    UIEvent.ON_CHANGE
];

export class YMLTabsView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        let tabs = {};
        const assignProps = PropsFilter(this.props, allowedProps);
        const assignEvents = EventsHook(this.props, allowedEvents);
        getTypes(obj).forEach(({name, type}, index) => {
            const nameTypeArr = (name && name.split('_')) || ['No_Name'];
            const props = obj[name];
            const tabName =
            (props && (props.tab|| props.label)) || nameTypeArr[nameTypeArr.length - 1]
            const newProps = {
                name: name,
                key: keyPath + index,
                keyPath: keyPath,
                type,
                obj: props,
            };
            tabs[tabName] = (
                <YMLComponent {...newProps} />
            ); 
        });
        return (
            <TabView
                key={keyPath}
                activeTab={obj.activeTab || 0}
                tabs={tabs}
                {...assignProps}
                {...assignEvents}
            />
        );
    }
}
