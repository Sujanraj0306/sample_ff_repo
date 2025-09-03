import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useBlog } from '../context/BlogContext.jsx';
import { useNavigate } from 'react-router-dom';
import DraggableComponent from '../components/DraggableComponent.jsx';
import ComponentToolbox from '../components/ComponentToolbox.jsx';
import DropZone from '../components/DropZone.jsx';
import Header from '../components/Header.jsx';
import { Eye, Save, Edit3 } from 'lucide-react';

const BlogEditor = () => {
  const { blogPost, updateTitle, addComponent, updateComponent, deleteComponent, moveComponent, saveBlog } = useBlog();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    saveBlog();
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
  };

  const handlePreview = () => {
    saveBlog();
    navigate('/preview');
  };

  const handleEditComponent = (id, content) => {
    updateComponent(id, { content });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Edit3 className="h-8 w-8 text-indigo-600" />
                <h1 className="text-3xl font-bold text-gray-900">Blog Editor</h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-lg transition-all duration-150 shadow-md hover:shadow-lg"
                >
                  <Save size={16} />
                  <span>{isSaving ? 'Saving...' : 'Save'}</span>
                </button>
                
                <button
                  onClick={handlePreview}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-150 shadow-md hover:shadow-lg"
                >
                  <Eye size={16} />
                  <span>Preview</span>
                </button>
              </div>
            </div>

            {/* Blog Title */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Blog Post Title
              </label>
              <input
                type="text"
                id="title"
                value={blogPost.title}
                onChange={(e) => updateTitle(e.target.value)}
                className="w-full text-2xl font-bold border-none outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-2 hover:bg-gray-50 transition-colors duration-150"
                placeholder="Enter your blog post title..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Blog Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px]">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Edit3 size={20} className="mr-2" />
                    Blog Content
                  </h2>
                  
                  <div className="space-y-4">
                    {blogPost.components.length === 0 ? (
                      <DropZone onDrop={addComponent} isEmpty={true} />
                    ) : (
                      <>
                        {blogPost.components.map((component, index) => (
                          <DraggableComponent
                            key={component.id}
                            component={component}
                            index={index}
                            moveComponent={moveComponent}
                            onDelete={deleteComponent}
                            onEdit={handleEditComponent}
                          />
                        ))}
                        <DropZone onDrop={addComponent} isEmpty={false} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Component Toolbox */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ComponentToolbox onAddComponent={addComponent} />
                
                {/* Tips */}
                <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <h4 className="font-medium text-indigo-900 mb-2">💡 Tips</h4>
                  <ul className="text-sm text-indigo-800 space-y-1">
                    <li>• Drag components to reorder</li>
                    <li>• Click text to edit inline</li>
                    <li>• Use image URLs for media</li>
                    <li>• Save before previewing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default BlogEditor;