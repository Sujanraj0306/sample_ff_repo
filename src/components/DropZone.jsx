import React from 'react';
import { useDrop } from 'react-dnd';
import { Plus } from 'lucide-react';
import { DragTypes } from '../types/blog.js';

const DropZone = ({ onDrop, isEmpty }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DragTypes.NEW_COMPONENT,
    drop: (item) => {
      const component = {
        id: `${item.componentType}-${Date.now()}`,
        type: item.componentType,
        content: getDefaultContent(item.componentType),
        style: {
          textAlign: 'left',
          margin: 'mb-6',
        },
      };
      onDrop(component);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const getDefaultContent = (type) => {
    switch (type) {
      case 'heading':
        return 'New Heading';
      case 'paragraph':
        return 'This is a new paragraph. Click to edit this text and make it your own.';
      case 'image':
        return 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=800';
      case 'video':
        return '';
      default:
        return '';
    }
  };

  const getDropZoneStyle = () => {
    let baseClasses = "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ";
    
    if (isOver && canDrop) {
      return baseClasses + "border-indigo-400 bg-indigo-50 transform scale-105";
    } else if (canDrop) {
      return baseClasses + "border-gray-300 bg-gray-50 hover:border-gray-400";
    } else if (isEmpty) {
      return baseClasses + "border-gray-300 bg-gray-50";
    }
    
    return baseClasses + "border-transparent";
  };

  return (
    <div ref={drop} className={getDropZoneStyle()}>
      <div className="flex flex-col items-center justify-center text-gray-500">
        <Plus size={32} className="mb-2" />
        <p className="text-lg font-medium">
          {isEmpty ? 'Drop components here to start building your blog' : 'Drop new components here'}
        </p>
        <p className="text-sm mt-1">
          {isEmpty ? 'Drag from the toolbox on the right' : 'Or click components in the toolbox'}
        </p>
      </div>
    </div>
  );
};

export default DropZone;