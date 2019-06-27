import React, { Component } from 'react';
import Native from 'libs/Native';
import { GithubListItem } from './GithubListItem';
const { ModuleHelper } = Native();

export class GithubListView extends Component {
    constructor() {
        super();
        this.doInstall = this.doInstall.bind(this);
        this.doUnInstall = this.doUnInstall.bind(this);
        this.state = {
            progressing: false,
        };
    }
    doInstall(content) {
        this.setState({ progressing: true });
        ModuleHelper.install(content.full_name, content.clone_url).then(() => {
            this.setState({ progressing: false });
        });
    }
    doUnInstall(content) {
        this.setState({ progressing: true });
        ModuleHelper.uninstall(content.full_name).then(() => {
            this.setState({ progressing: false });
        });
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
