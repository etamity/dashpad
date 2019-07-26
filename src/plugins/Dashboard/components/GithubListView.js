import React, { Component } from 'react';
import { GithubListItem } from './GithubListItem';

export class GithubListView extends Component {
    constructor() {
        super();
    }
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
