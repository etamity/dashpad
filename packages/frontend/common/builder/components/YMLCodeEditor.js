import React from 'react';
import AceEditor, { split as SplitEditor, diff as DiffEditor } from 'react-ace';
import { YMLBase } from './YMLBase';
import { PropsFilter, EventsHook } from './utils';
import { UIEvent } from './Constants';
import { VarsKeyStore } from './ValueResovler';
import { AppAction } from 'common/reducers/app';
import _ from 'lodash';
import 'brace/mode/jsx';

const languages = [
    'javascript',
    'java',
    'python',
    'xml',
    'ruby',
    'sass',
    'markdown',
    'mysql',
    'json',
    'html',
    'handlebars',
    'golang',
    'csharp',
    'elixir',
    'typescript',
    'css',
    'sh',
    'yaml',
    'sql',
    'jsx',
    'css',
];

const themes = ['github', 'solarized_dark', 'terminal'];

languages.forEach(lang => {
    require(`brace/mode/${lang}`);
    require(`brace/snippets/${lang}`);
});

themes.forEach(theme => {
    require(`brace/theme/${theme}`);
});

const allowedProps = [
    'mode',
    'theme',
    'splits',
    'value',
    'defaultValue',
    'placeholder',
    'height',
    'width',
    'className',
    'fontSize',
    'showGutter',
    'showPrintMargin',
    'highlightActiveLine',
    'focus',
    'cursorStart',
    'wrapEnabled',
    'readOnly',
    'minLines',
    'maxLines',
    'enableBasicAutocompletion',
    'enableLiveAutocompletion',
    'tabSize',
    'debounceChangePeriod',
    'editorProps',
    'setOptions',
    'commands',
    'annotations',
    'markers',
    'data-',
];

const allowedEvents = [
    UIEvent.ON_SCROLL,
    UIEvent.ON_LOAD,
    UIEvent.ON_CHANGE,
    UIEvent.ON_COPY,
    UIEvent.ON_PASTE,
    UIEvent.ON_SELECTION_CHANGE,
    UIEvent.ON_CURSOR_CHANGE,
    UIEvent.ON_FOCUS,
    UIEvent.ON_BEFORE_LOAD,
];

const defaultProps = {
    width: '100%',
    theme: 'solarized_dark',
    mode: 'json',
    wrapEnabled: true,
};

export class YMLCodeEditorView extends YMLBase {
    constructor(props) {
        super(props);
        const { obj } = this.props;
        this.assignEvents = EventsHook(props, allowedEvents);
        this.state = {
            value: obj.value || obj.defaultValue,
        };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }
    componentWillReceiveProps(props) {
        const { obj } = props;
        this.setState ({
            value: obj.value || obj.defaultValue,
        });
    }
    onChange(value) {
        this.setState({
            value,
        });
    }
    onBlur(e) {
        // eslint-disable-next-line no-new-wrappers
        try {
            const newValue = JSON.parse(this.state.value);
            const { keyPath } = this.props;
            const _varsPath =
                keyPath.substring(keyPath.indexOf('.'), keyPath.length) +
                '.value';
            const _varsKey = VarsKeyStore[_varsPath];
            if (_varsKey) {
                const keyPathVars = `$vars.${_varsKey}`;
                AppAction.updateUIState({
                    keyPath: keyPathVars,
                    value: newValue,
                });
            } else {
                const keyPathPropkey = `${keyPath}.value`;
                AppAction.updateUIState({
                    keyPath: keyPathPropkey,
                    value: newValue,
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
    render() {
        const { keyPath, obj } = this.props;
        const mergeProps = { ...defaultProps, ...obj, value: this.state.value };
        if (mergeProps.mode === 'json' && _.isObject(mergeProps.value)) {
            mergeProps.value = JSON.stringify(mergeProps.value, null, 2);
        }
        const assignProps = PropsFilter({ obj: mergeProps }, allowedProps);

        let CodeComponent = AceEditor;

        switch (obj.type) {
            case 'split':
                CodeComponent = SplitEditor;
                break;
            case 'diff':
                CodeComponent = DiffEditor;
                break;
            default:
                CodeComponent = AceEditor;
        }

        return (
            <CodeComponent
                name={keyPath}
                key={keyPath}
                {...assignProps}
                {...this.assignEvents}
                onChange={this.onChange}
                onBlur={this.onBlur}
            />
        );
    }
}
