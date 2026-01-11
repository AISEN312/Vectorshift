// BaseNode.js
// Base component for creating nodes with consistent structure and styling

import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data, 
  title,
  inputs = [],
  outputs = [],
  children,
  style = {}
}) => {
  const defaultStyle = {
    minWidth: 200,
    minHeight: 80,
    border: '2px solid #4a90e2',
    borderRadius: '8px',
    padding: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    ...style
  };

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: '8px',
    color: '#2c3e50',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '6px'
  };

  return (
    <div style={defaultStyle}>
      {/* Render input handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`${id}-${input.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            top: inputs.length > 1 ? `${((index + 1) * 100) / (inputs.length + 1)}%` : '50%',
            background: '#4a90e2'
          }}
          title={input.label}
        />
      ))}
      
      {/* Title */}
      <div style={titleStyle}>
        {title}
      </div>
      
      {/* Custom content */}
      <div style={{ marginTop: '8px' }}>
        {children}
      </div>
      
      {/* Render output handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`${id}-${output.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{
            top: outputs.length > 1 ? `${((index + 1) * 100) / (outputs.length + 1)}%` : '50%',
            background: '#4a90e2'
          }}
          title={output.label}
        />
      ))}
    </div>
  );
};
