'use dom';
import React, { useState } from 'react';
import './styles.css';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

import ExampleTheme from './ExampleTheme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  EditorState,
  LexicalEditor,
} from 'lexical';

const placeholder = 'Enter some rich text...';

export default function Editor({
  setPlainText,
  setEditorState,
}: {
  setPlainText: React.Dispatch<React.SetStateAction<string>>;
  setEditorState: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const editorConfig = {
    namespace: '',
    nodes: [],
    // Handling of errors during update
    onError(error: Error) {
      throw error;
    },
    // The editor theme
    theme: ExampleTheme,
    editorState: () => {
      const root = $getRoot();
      root.clear();
      const p = $createParagraphNode();
      p.append($createTextNode('initial text'));
      root.append(p);
    },
  };
  return (
    <>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="editor-input"
                  aria-placeholder={placeholder}
                  placeholder={<div className="editor-placeholder">{placeholder}</div>}
                />
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin
              onChange={(editorState, editor, tags) => {
                editorState.read(() => {
                  const root = $getRoot();
                  const textContent = root.getTextContent();
                  setPlainText(textContent);
                });
                setEditorState(JSON.stringify(editorState.toJSON()));
              }}
              ignoreHistoryMergeTagChange
              ignoreSelectionChange
            />
            <AutoFocusPlugin />
            <HistoryPlugin />
            {/* <TreeViewPlugin /> */}
          </div>
        </div>
      </LexicalComposer>
    </>
  );
}
