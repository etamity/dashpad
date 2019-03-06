import React, { Component } from 'react';
import { YMLComponent } from './YMLComponent';
import TabView from 'components/TabView';
import { getTypes } from './utils';
import Context from '../Context';
export class YMLTabsView extends Component {
    componentWillMount() {
        const { obj } = this.props;
        obj && obj.onWillMount && Context.vm.run(obj.onWillMount);
    }
    componentDidMount() {
        const { obj } = this.props;
        obj && obj.onMount && Context.vm.run(obj.onMount);
    }

    render() {
        const { keyPath, obj } = this.props;
        let tabs = {};
        getTypes(obj).forEach(({name, type}, index) => {
            const nameTypeArr = (name && name.split('_')) || ['No_Name'];
            const tabName =
                obj[name].label || nameTypeArr[nameTypeArr.length - 1]
            const newProps = {
                name: name,
                key: keyPath + index,
                keyPath: keyPath,
                type,
                obj: obj[name],
            };
            tabs[tabName] = (
                <YMLComponent {...newProps} />
            ); 
        });
        return (
            <TabView
                key={keyPath}
                activeTab={(obj && obj.selected) || 0}
                tabs={tabs}
            />
        );
    }
}
