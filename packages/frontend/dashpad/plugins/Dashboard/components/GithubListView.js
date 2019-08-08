import React, { Component } from 'react';
import { GithubListItem } from './GithubListItem';

export class GithubListView extends Component {
    render() {
        const { items } = this.props;
        const pluginList =
            items &&
            items.map((content, index) => (
                <GithubListItem key={index} content={content} />
            ));

        return pluginList;
    }
}
