from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses topological sorting approach (Kahn's algorithm).
    """
    if not nodes:
        return True
    
    # Build adjacency list and in-degree count
    adjacency = {node['id']: [] for node in nodes}
    in_degree = {node['id']: 0 for node in nodes}
    
    # Populate adjacency list and in-degree
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source in adjacency and target in in_degree:
            adjacency[source].append(target)
            in_degree[target] += 1
    
    # Find all nodes with in-degree 0
    queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
    visited_count = 0
    
    # Process nodes with in-degree 0
    while queue:
        node = queue.pop(0)
        visited_count += 1
        
        # Reduce in-degree for neighbors
        for neighbor in adjacency[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we visited all nodes, it's a DAG
    return visited_count == len(nodes)

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag_status = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag_status
    }
