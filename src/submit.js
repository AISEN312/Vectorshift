// submit.js

import { useStore } from './store';
import { useState } from 'react';

// Backend API URL - can be configured via environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const SubmitButton = () => {
    const nodes = useStore(state => state.nodes);
    const edges = useStore(state => state.edges);
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = async () => {
        try {
            // Prepare the pipeline data
            const pipelineData = {
                nodes: nodes,
                edges: edges
            };

            // Send to backend
            const response = await fetch(`${API_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Display alert with results
            const message = `Pipeline Analysis:\n\n` +
                          `Number of Nodes: ${result.num_nodes}\n` +
                          `Number of Edges: ${result.num_edges}\n` +
                          `Is DAG: ${result.is_dag ? 'Yes ✓' : 'No ✗'}\n\n` +
                          (result.is_dag 
                            ? 'This pipeline forms a valid Directed Acyclic Graph!' 
                            : 'Warning: This pipeline contains cycles and is not a DAG.');

            alert(message);

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`Error submitting pipeline: ${error.message}\n\nMake sure the backend is running on ${API_URL}`);
        }
    };

    const containerStyle = {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#f5f7fa',
        borderTop: '2px solid #e0e6ed'
    };

    const buttonStyle = {
        padding: '12px 32px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#fff',
        backgroundColor: isHovered ? '#357abd' : '#4a90e2',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: isHovered ? '0 4px 12px rgba(74, 144, 226, 0.4)' : '0 2px 8px rgba(74, 144, 226, 0.3)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.2s ease'
    };

    return (
        <div style={containerStyle}>
            <button 
                type="submit" 
                onClick={handleSubmit}
                style={buttonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                Submit Pipeline
            </button>
        </div>
    );
}
