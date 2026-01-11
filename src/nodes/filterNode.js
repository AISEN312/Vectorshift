// filterNode.js
// A node that filters data based on conditions

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [filterCondition, setFilterCondition] = useState(data?.filterCondition || 'contains');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[
        { id: 'match', label: 'Match' },
        { id: 'nomatch', label: 'No Match' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
          <span style={{ marginBottom: '4px', color: '#555' }}>Condition:</span>
          <select 
            value={filterCondition} 
            onChange={(e) => setFilterCondition(e.target.value)}
            style={{
              padding: '6px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '12px'
            }}
          >
            <option value="contains">Contains</option>
            <option value="equals">Equals</option>
            <option value="startsWith">Starts With</option>
            <option value="endsWith">Ends With</option>
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
          <span style={{ marginBottom: '4px', color: '#555' }}>Value:</span>
          <input 
            type="text" 
            value={filterValue} 
            onChange={(e) => setFilterValue(e.target.value)}
            style={{
              padding: '6px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '12px'
            }}
            placeholder="Filter value"
          />
        </label>
      </div>
    </BaseNode>
  );
};
