import React from 'react';
import { useDrag } from 'react-dnd';
import { Type, AlignLeft, Image, Video, Plus } from 'lucide-react';
import { DragTypes, ComponentTypes } from '../types/blog.js';

const ToolboxItem = ({ type, icon: Icon, label, onAdd }) => {
  const [{ isDragging }, drag] = useDrag({
    type: DragTypes.NEW_COMPONENT,
    item: { componentType: type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 cursor-move transition-all duration-200 ${isDragging ? 'opacity-50' : ''}`}
      onClick={() => onAdd(type)}
    >
      <div className="flex items-center space-x-3">
        <Icon size={20} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <Plus size={16} className="text-gray-400 ml-auto" />
      </div>
    </div>
  );
};

const ComponentToolbox = ({ onAddComponent }) => {
  const handleAddComponent = (type) => {
    const component = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      style: {
        textAlign: 'left',
        margin: 'mb-6',
      },
    };
    onAddComponent(component);
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case ComponentTypes.HEADING:
        return 'New Heading';
      case ComponentTypes.PARAGRAPH:
        return 'This is a new paragraph. Click to edit this text and make it your own.';
      case ComponentTypes.IMAGE:
        return 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=800';
      case ComponentTypes.VIDEO:
        return '';
      default:
        return '';
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Plus size={20} className="mr-2" />
        Add Components
      </h3>
      <div className="space-y-3">
        <ToolboxItem
          type={ComponentTypes.HEADING}
          icon={Type}
          label="Heading"
          onAdd={handleAddComponent}
        />
        <ToolboxItem
          type={ComponentTypes.PARAGRAPH}
          icon={AlignLeft}
          label="Paragraph"
          onAdd={handleAddComponent}
        />
        <ToolboxItem
          type={ComponentTypes.IMAGE}
          icon={Image}
          label="Image"
          onAdd={handleAddComponent}
        />
        <ToolboxItem
          type={ComponentTypes.VIDEO}
          icon={Video}
          label="Video"
          onAdd={handleAddComponent}
        />
      </div>
    </div>
  );
};

export default ComponentToolbox;