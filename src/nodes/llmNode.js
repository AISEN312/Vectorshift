// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputs={[
        { id: 'system', label: 'System' },
        { id: 'prompt', label: 'Prompt' }
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      <div style={{ 
        padding: '8px', 
        fontSize: '12px', 
        color: '#666',
        fontStyle: 'italic'
      }}>
        This is a Language Model node.
      </div>
    </BaseNode>
  );
}
