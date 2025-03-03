/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import '../styles.css';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import { $patchStyleText, $getSelectionStyleValueForProperty } from '@lexical/selection';
import ColorPicker from 'reanimated-color-picker';

const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}

function ColorPlugin() {
  const [editor] = useLexicalComposerContext();
  const [{ color, bgColor }, setColors] = useState({
    color: '#000',
    bgColor: '#fff',
  });

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const _color = $getSelectionStyleValueForProperty(selection, 'color', '#000');
      const _bgColor = $getSelectionStyleValueForProperty(selection, 'background-color', '#fff');
      setColors({ color: _color, bgColor: _bgColor });
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const updateColor = ({
    property,
    color,
  }: {
    property: 'background-color' | 'color';
    color: string;
  }) => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection) $patchStyleText(selection, { [property]: color });
    });
  };

  return (
    <>
      <span className="color-picker-wrapper">
        <ColorPicker
          style={{ width: 150 }}
          sliderThickness={20}
          thumbSize={25}
          value={color}
          onComplete={({ hex }) => {
            updateColor({ property: 'color', color: hex });
          }}
        />
        <span className="color-label">Text</span>
      </span>

      <span className="color-picker-wrapper">
        <ColorPicker
          style={{ width: 150 }}
          sliderThickness={20}
          thumbSize={25}
          value={bgColor}
          onComplete={({ hex }) => {
            updateColor({ property: 'background-color', color: hex });
          }}
        />
        <span className="color-label">BG</span>
      </span>
    </>
  );
}

export default ColorPlugin;
