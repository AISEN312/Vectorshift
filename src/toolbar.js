// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ 
            padding: '16px', 
            backgroundColor: '#f5f7fa',
            borderBottom: '2px solid #e0e6ed',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '12px',
                justifyContent: 'center'
            }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='combine' label='Combine' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='conditional' label='Conditional' />
            </div>
        </div>
    );
};
