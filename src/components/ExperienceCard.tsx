import React from 'react';
import { Calendar, Building2, ChevronRight } from 'lucide-react';

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  skills?: string[];
}

export function ExperienceCard({ 
  title, 
  company, 
  period, 
  description,
  skills = []
}: ExperienceCardProps) {
  return (
    <div className="group bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 
    hover:bg-zinc-700/50 transition-all duration-500 transform hover:-translate-y-1
    hover:shadow-xl hover:shadow-purple-500/10 relative cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 
        opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg -z-10" />
      
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-glow">{title}</h3>
          <div className="flex items-center gap-4 text-zinc-400 mb-3">
            <div className="flex items-center gap-1">
              <Building2 size={16} className="group-hover:animate-float" />
              <span className="font-medium">{company}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} className="group-hover:animate-float" />
              <span>{period}</span>
            </div>
          </div>
          <p className="text-zinc-400 mb-4 pr-8">{description}</p>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={skill} 
                  className="skill-tag"
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    transform: `translateY(${index * 2}px)`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
        <ChevronRight 
          size={20} 
          className="text-zinc-600 transform transition-all duration-300 
          group-hover:translate-x-1 group-hover:text-zinc-400" 
        />
      </div>
    </div>
  );
}