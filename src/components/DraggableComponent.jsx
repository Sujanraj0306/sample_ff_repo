import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { GripVertical, Trash2, Edit3 } from 'lucide-react';
import { DragTypes } from '../types/blog.js';

const DraggableComponent = ({
  component,
  index,
  moveComponent,
  onDelete,
  onEdit,
  isPreview = false,
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: DragTypes.COMPONENT,
    hover: (item) => {
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) return;
      
      moveComponent(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: DragTypes.COMPONENT,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (!isPreview) {
    drop(preview(ref));
  }

  const renderContent = () => {
    const commonClasses = `${component.style?.textAlign ? `text-${component.style.textAlign}` : ''} ${component.style?.margin || 'mb-6'}`;
    
    switch (component.type) {
      case 'heading':
        return (
          <h2 
            className={`text-3xl font-bold text-gray-900 leading-tight ${commonClasses} ${!isPreview ? 'hover:bg-gray-50 rounded px-2 py-1 transition-colors duration-150' : ''}`}
            contentEditable={!isPreview}
            suppressContentEditableWarning={true}
            onBlur={(e) => !isPreview && onEdit(component.id, e.currentTarget.textContent || '')}
            placeholder={!isPreview ? "Click to edit heading..." : ""}
          >
            {component.content}
          </h2>
        );
      case 'paragraph':
        return (
          <p 
            className={`text-gray-700 leading-relaxed text-lg ${commonClasses} ${!isPreview ? 'hover:bg-gray-50 rounded px-2 py-1 transition-colors duration-150' : ''}`}
            contentEditable={!isPreview}
            suppressContentEditableWarning={true}
            onBlur={(e) => !isPreview && onEdit(component.id, e.currentTarget.textContent || '')}
            placeholder={!isPreview ? "Click to edit paragraph..." : ""}
          >
            {component.content}
          </p>
        );
      case 'image':
        return (
          <div className={`${commonClasses}`}>
            <img 
              src={component.content || 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=800'} 
              alt="Blog content" 
              className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            />
            {!isPreview && (
              <input
                type="url"
                placeholder="Enter image URL"
                className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-150"
                defaultValue={component.content}
                onBlur={(e) => onEdit(component.id, e.target.value)}
              />
            )}
          </div>
        );
      case 'video':
        return (
          <div className={`${commonClasses}`}>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
              <div className="text-gray-500 mb-2">
                <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6a1 1 0 011 1v8a1 1 0 01-1 1H7a1 1 0 01-1-1V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">Video Player</p>
              <p className="text-sm text-gray-500 mt-1">{component.content || 'No video URL provided'}</p>
            </div>
            {!isPreview && (
              <input
                type="url"
                placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-150"
                defaultValue={component.content}
                onBlur={(e) => onEdit(component.id, e.target.value)}
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className={`group relative ${isDragging ? 'opacity-50' : ''} ${isPreview ? '' : 'hover:bg-gray-50'} rounded-lg transition-all duration-200 ${isPreview ? 'p-0' : 'p-2'}`}
    >
      {!isPreview && (
        <div className="absolute -left-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col space-y-1">
          <button
            ref={drag}
            className="p-1 text-gray-400 hover:text-gray-600 cursor-move transition-colors duration-150"
            title="Drag to reorder"
          >
            <GripVertical size={16} />
          </button>
          <button
            onClick={() => onDelete(component.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-150"
            title="Delete component"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
      
      <div className={`${!isPreview ? 'ml-4' : ''}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default DraggableComponent;