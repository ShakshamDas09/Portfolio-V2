import React, { useState } from 'react';
import { ExternalLink, Eye, Github, Lock, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  isPrivate?: boolean;
}

export function ProjectCard({ 
  title, 
  description, 
  tech, 
  image,
  demoUrl,
  githubUrl,
  isPrivate 
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="group relative bg-zinc-800/50 backdrop-blur-sm rounded-lg overflow-hidden 
      hover:bg-zinc-700/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10
      transform perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 
        opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
      
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 p-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 group-hover:text-glow">
            {title}
            {isPrivate && (
              <Lock 
                size={16} 
                className="text-zinc-400 group-hover:animate-float" 
              />
            )}
          </h3>
          <p className="text-zinc-400 mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((item, index) => (
              <span 
                key={item} 
                className="tech-tag"
                style={{
                  transitionDelay: `${index * 50}ms`,
                  transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                  opacity: isHovered ? 1 : 0
                }}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {demoUrl && (
              <a 
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link group/link"
              >
                <Eye size={16} className="group-hover/link:animate-float" />
                <span>Live Demo</span>
                <ArrowRight 
                  size={14}
                  className="opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform group-hover/link:translate-x-1"
                />
              </a>
            )}
            {githubUrl && !isPrivate && (
              <a 
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link group/link"
              >
                <Github size={16} className="group-hover/link:animate-float" />
                <span>Source</span>
                <ArrowRight 
                  size={14}
                  className="opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform group-hover/link:translate-x-1"
                />
              </a>
            )}
          </div>
        </div>
        <div className="md:w-1/3 relative overflow-hidden">
          <div className={`absolute inset-0 bg-zinc-800 ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`} />
          <img
            src={image}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            className={`h-full w-full object-cover transition-all duration-700
            ${isHovered ? 'scale-110 rotate-1' : 'scale-100 rotate-0'}
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ aspectRatio: '16/9' }}
          />
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent
            opacity-0 group-hover:opacity-70 transition-opacity duration-500`}
          />
        </div>
      </div>
    </div>
  );
}