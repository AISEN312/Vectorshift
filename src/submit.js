// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore(state => state.nodes);
    const edges = useStore(state => state.edges);

    const handleSubmit = async () => {
        try {
            // Prepare the pipeline data
            const pipelineData = {
                nodes: nodes,
                edges: edges
            };

            // Send to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
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
            alert(`Error submitting pipeline: ${error.message}\n\nMake sure the backend is running on http://localhost:8000`);
        }
    };

    return (
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: '#f5f7fa',
            borderTop: '2px solid #e0e6ed'
        }}>
            <button 
                type="submit" 
                onClick={handleSubmit}
                style={{
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#fff',
                    backgroundColor: '#4a90e2',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(74, 144, 226, 0.3)',
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#357abd';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(74, 144, 226, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#4a90e2';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(74, 144, 226, 0.3)';
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
}
