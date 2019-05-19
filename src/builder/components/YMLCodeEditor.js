import React from 'react';
import AceEditor, { split as SplitEditor, diff as DiffEditor } from 'react-ace';
import { YMLBase } from './YMLBase';
import { PropsFilter, EventsHook } from './utils';
import { UIEvent } from './Constants';
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
    'css'
];

const themes = [
    'github',
    'solarized_dark',
    'terminal',
];

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

export class YMLCodeEditorView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        const assignProps = PropsFilter(this.props, allowedProps);
        const assignEvents = EventsHook(this.props, allowedEvents);
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
                {...assignEvents}
            />
        );
    }
}