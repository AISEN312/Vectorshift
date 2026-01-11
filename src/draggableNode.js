// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '100px', 
          height: '65px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '10px',
          backgroundColor: '#4a90e2',
          justifyContent: 'center', 
          flexDirection: 'column',
          boxShadow: '0 2px 8px rgba(74, 144, 226, 0.3)',
          transition: 'all 0.2s ease',
          border: '2px solid #357abd',
          padding: '8px 16px'
        }} 
        draggable
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 144, 226, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(74, 144, 226, 0.3)';
        }}
      >
          <span style={{ 
            color: '#fff', 
            fontWeight: '600',
            fontSize: '13px',
            textAlign: 'center'
          }}>{label}</span>
      </div>
    );
  };
  