import React from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import whiteTheme from './theme/whiteTheme';
import { defaultOptions } from './config';
import './style.css';
export default class Test extends React.Component {
    componentDidMount () {
        this.initMonaco();
        this.initEditor();
        console.log('register langiages', monaco.languages.getLanguages())
        console.log('model', this.monacoInstance && this.monacoInstance.getModel())
    }
    componentWillMount () {
        this.destoryMonaco();
    }
    monacoInstance = null;
    monacoDom = null;
    initMonaco = () => {
        const { language, options } = this.props;
        if (!this.monacoDom) {
            console.error('初始化出错')
            return;
        }
        const monacoEditorOpts = Object.assign({}, defaultOptions, options, {
            value: `console.log("hello,world")`,
            language: language || 'sql'
        })
        this.monacoInstance = monaco.editor.create(this.monacoDom, monacoEditorOpts)
    }
    initEditor = () => {
        this.initTheme();
        this.initEventer();
    }
    initTheme = () => {
        monaco.editor.defineTheme('white', whiteTheme);
        this.props.theme && monaco.editor.setTheme(this.props.theme);
        // monaco.editor.setTheme('vs-dark');
        // monaco.editor.setTheme('hc-black');
    }
    initEventer = () => {
        if (!this.monacoInstance) return;
        this.monacoInstance.onDidChangeModelContent((event) => {
            const newValue = this.monacoInstance.getValue();
            console.log(newValue)
        })
    }
    destoryMonaco = () => {
        if (this.monacoInstance) {
            this.monacoInstance.dispose();
        }
    }
    render () {
        const defaultStyle= {
            position: 'relative',
            minHeight: '400px',
            height: '100%',
            width: '100%'
        }
        return (
            <div
                style={defaultStyle}
                ref={(dom) => this.monacoDom = dom}
            >
            </div>
        )
    }
}
