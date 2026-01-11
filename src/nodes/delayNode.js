// delayNode.js
// A node that adds a delay to data processing

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const [delayTime, setDelayTime] = useState(data?.delayTime || 1000);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Delay"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[{ id: 'output', label: 'Output' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
          <span style={{ marginBottom: '4px', color: '#555' }}>Delay (ms):</span>
          <input 
            type="number" 
            value={delayTime} 
            onChange={(e) => setDelayTime(e.target.value)}
            style={{
              padding: '6px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '12px'
            }}
            min="0"
            step="100"
          />
        </label>
        <div style={{ fontSize: '10px', color: '#888' }}>
          Delay: {delayTime / 1000}s
        </div>
      </div>
    </BaseNode>
  );
};
