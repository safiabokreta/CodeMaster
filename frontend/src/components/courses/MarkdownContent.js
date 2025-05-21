import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'prism-react-renderer';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import '../../assets/styles/courses/markdown-content.css';

const MarkdownContent = ({ content }) => {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Code blocks with proper new lines and syntax highlighting
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                style={dracula}
                PreTag="div"
                wrapLines={true}
                showLineNumbers={true}
                lineNumberStyle={{ minWidth: '2.5em' }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="inline-code" {...props}>
                {children}
              </code>
            );
          },
          // Paragraphs with proper line spacing
          p({ node, ...props }) {
            return <p className="markdown-paragraph" {...props} />;
          },
          // Headings with consistent spacing
          h1({ node, ...props }) {
            return <h1 className="markdown-h1" {...props} />;
          },
          h2({ node, ...props }) {
            return <h2 className="markdown-h2" {...props} />;
          },
          h3({ node, ...props }) {
            return <h3 className="markdown-h3" {...props} />;
          },
          // Lists with proper indentation
          ul({ node, ...props }) {
            return <ul className="markdown-list" {...props} />;
          },
          ol({ node, ...props }) {
            return <ol className="markdown-list" {...props} />;
          },
          li({ node, ...props }) {
            return <li className="markdown-list-item" {...props} />;
          },
          // Blockquotes with distinctive styling
          blockquote({ node, ...props }) {
            return <blockquote className="markdown-blockquote" {...props} />;
          },
          // Horizontal rules
          hr({ node, ...props }) {
            return <hr className="markdown-hr" {...props} />;
          },
          // Tables with proper formatting
          table({ node, ...props }) {
            return <table className="markdown-table" {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;