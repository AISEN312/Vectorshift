// combineNode.js
// A node that combines multiple inputs

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const CombineNode = ({ id, data }) => {
  const [separator, setSeparator] = useState(data?.separator || ' ');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Combine"
      inputs={[
        { id: 'input1', label: 'Input 1' },
        { id: 'input2', label: 'Input 2' },
        { id: 'input3', label: 'Input 3' }
      ]}
      outputs={[{ id: 'output', label: 'Output' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
          <span style={{ marginBottom: '4px', color: '#555' }}>Separator:</span>
          <input 
            type="text" 
            value={separator} 
            onChange={(e) => setSeparator(e.target.value)}
            style={{
              padding: '6px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '12px'
            }}
            placeholder="e.g., space, comma"
          />
        </label>
      </div>
    </BaseNode>
  );
};
