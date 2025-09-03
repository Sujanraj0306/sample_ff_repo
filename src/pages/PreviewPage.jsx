import React from 'react';
import { useBlog } from '../context/BlogContext.jsx';
import { useNavigate } from 'react-router-dom';
import DraggableComponent from '../components/DraggableComponent.jsx';
import Header from '../components/Header.jsx';
import { ArrowLeft, Edit3, Calendar } from 'lucide-react';

const PreviewPage = () => {
  const { blogPost } = useBlog();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Preview Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium mb-4 transition-colors duration-150"
          >
            <ArrowLeft size={20} />
            <span>Back to Editor</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Preview Mode</h1>
              <p className="text-gray-600">How your blog post will look to readers</p>
            </div>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-150 shadow-md hover:shadow-lg"
            >
              <Edit3 size={16} />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Blog Preview */}
        <article className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Blog Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-emerald-600 px-8 py-12 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {blogPost.title}
            </h1>
            <div className="flex items-center space-x-2 text-indigo-100">
              <Calendar size={16} />
              <span className="text-sm">
                {new Date(blogPost.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Blog Content */}
          <div className="px-8 py-12">
            {blogPost.components.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Edit3 size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">No content yet</h3>
                <p className="text-gray-500">Go back to the editor to add some content to your blog post.</p>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                {blogPost.components.map((component, index) => (
                  <DraggableComponent
                    key={component.id}
                    component={component}
                    index={index}
                    moveComponent={() => {}}
                    onDelete={() => {}}
                    onEdit={() => {}}
                    isPreview={true}
                  />
                ))}
              </div>
            )}
          </div>
        </article>

        {/* Preview Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            This is how your blog post will appear to readers
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;