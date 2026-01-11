// textNode.js

import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';

// Constants for text node sizing
const MIN_TEXTAREA_WIDTH = 180;
const MAX_TEXTAREA_WIDTH = 400;
const MIN_TEXTAREA_HEIGHT = 40;
const CHAR_WIDTH_MULTIPLIER = 8;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [textAreaWidth, setTextAreaWidth] = useState(MIN_TEXTAREA_WIDTH);
  const [variables, setVariables] = useState([]);
  const textAreaRef = useRef(null);

  // Extract variables from text (e.g., {{variable}})
  const extractVariables = (text) => {
    const matchesSet = new Set();
    // Create new regex for each call to avoid lastIndex issues
    const matches = text.matchAll(/\{\{(\w+)\}\}/g);
    for (const match of matches) {
      matchesSet.add(match[1]);
    }
    return Array.from(matchesSet);
  };

  useEffect(() => {
    // Extract variables from text
    const vars = extractVariables(currText);
    setVariables(vars);
    
    // Auto-resize textarea
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      const newHeight = Math.max(MIN_TEXTAREA_HEIGHT, textAreaRef.current.scrollHeight);
      setTextAreaHeight(`${newHeight}px`);
      
      // Adjust width based on content
      const lines = currText.split('\n');
      const maxLineLength = Math.max(...lines.map(line => line.length), 10);
      const newWidth = Math.min(
        Math.max(MIN_TEXTAREA_WIDTH, maxLineLength * CHAR_WIDTH_MULTIPLIER), 
        MAX_TEXTAREA_WIDTH
      );
      setTextAreaWidth(newWidth);
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create input handles for each variable
  const inputs = variables.map(varName => ({
    id: varName,
    label: varName
  }));

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      inputs={inputs}
      outputs={[{ id: 'output', label: 'Output' }]}
      style={{ minWidth: textAreaWidth + 40 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
          <span style={{ marginBottom: '4px', color: '#555' }}>Text:</span>
          <textarea
            ref={textAreaRef}
            value={currText}
            onChange={handleTextChange}
            style={{
              width: '100%',
              height: textAreaHeight,
              padding: '6px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '12px',
              fontFamily: 'inherit',
              resize: 'none',
              overflow: 'hidden'
            }}
            placeholder="Enter text with {{variables}}"
          />
        </label>
        {variables.length > 0 && (
          <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>
    </BaseNode>
  );
}
