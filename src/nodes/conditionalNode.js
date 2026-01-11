// conditionalNode.js
// A node that routes data based on conditions

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'greaterThan');
  const [threshold, setThreshold] = useState(data?.threshold || 0);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Conditional"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[
        { id: 'true', label: 'True' },
        { id: 'false', label: 'False' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
          <span style={{ marginBottom: '4px', color: '#555' }}>Condition:</span>
          <select 
            value={condition} 
            onChange={(e) => setCondition(e.target.value)}
            style={{
              padding: '6px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '12px'
            }}
          >
            <option value="greaterThan">Greater Than</option>
            <option value="lessThan">Less Than</option>
            <option value="equals">Equals</option>
            <option value="notEquals">Not Equals</option>
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
          <span style={{ marginBottom: '4px', color: '#555' }}>Threshold:</span>
          <input 
            type="number" 
            value={threshold} 
            onChange={(e) => setThreshold(e.target.value)}
            style={{
              padding: '6px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '12px'
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};
