import React, { createContext, useContext, useState } from 'react';

const BlogContext = createContext(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

const createDefaultBlog = () => ({
  id: 'default-blog',
  title: 'My Awesome Blog Post',
  components: [],
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const BlogProvider = ({ children }) => {
  const [blogPost, setBlogPost] = useState(() => {
    const saved = localStorage.getItem('blog-post');
    return saved ? JSON.parse(saved) : createDefaultBlog();
  });

  const updateTitle = (title) => {
    setBlogPost(prev => ({
      ...prev,
      title,
      updatedAt: new Date(),
    }));
  };

  const addComponent = (component) => {
    setBlogPost(prev => ({
      ...prev,
      components: [...prev.components, component],
      updatedAt: new Date(),
    }));
  };

  const updateComponent = (id, updates) => {
    setBlogPost(prev => ({
      ...prev,
      components: prev.components.map(comp => 
        comp.id === id ? { ...comp, ...updates } : comp
      ),
      updatedAt: new Date(),
    }));
  };

  const deleteComponent = (id) => {
    setBlogPost(prev => ({
      ...prev,
      components: prev.components.filter(comp => comp.id !== id),
      updatedAt: new Date(),
    }));
  };

  const moveComponent = (dragIndex, hoverIndex) => {
    setBlogPost(prev => {
      const newComponents = [...prev.components];
      const draggedComponent = newComponents[dragIndex];
      newComponents.splice(dragIndex, 1);
      newComponents.splice(hoverIndex, 0, draggedComponent);
      
      return {
        ...prev,
        components: newComponents,
        updatedAt: new Date(),
      };
    });
  };

  const saveBlog = () => {
    localStorage.setItem('blog-post', JSON.stringify(blogPost));
  };

  return (
    <BlogContext.Provider value={{
      blogPost,
      updateTitle,
      addComponent,
      updateComponent,
      deleteComponent,
      moveComponent,
      saveBlog,
    }}>
      {children}
    </BlogContext.Provider>
  );
};