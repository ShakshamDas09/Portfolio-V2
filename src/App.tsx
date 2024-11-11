import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { ExperienceCard } from './components/ExperienceCard';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-300">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-800/50 backdrop-blur-sm z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24">
        <Header />

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            Featured Projects
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-700 to-transparent ml-4" />
          </h2>
          <div className="space-y-12">
            <ProjectCard
              title="E-Commerce Platform"
              description="A full-featured e-commerce solution built with React, Node.js, and MongoDB. Implements secure payment processing, real-time inventory management, and an intuitive admin dashboard."
              tech={['React', 'Node.js', 'MongoDB', 'Stripe']}
              image="https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1280"
              demoUrl="https://demo.example.com"
              githubUrl="https://github.com"
            />
            <ProjectCard
              title="Task Management App"
              description="A collaborative task management application featuring real-time updates, team workspaces, and automated workflow capabilities."
              tech={['TypeScript', 'Next.js', 'PostgreSQL', 'WebSocket']}
              image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1280"
              demoUrl="https://demo.example.com"
              isPrivate={true}
            />
            <ProjectCard
              title="AI Content Generator"
              description="An AI-powered platform that helps content creators generate and optimize content using advanced natural language processing."
              tech={['Python', 'React', 'OpenAI', 'FastAPI']}
              image="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1280"
              githubUrl="https://github.com"
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            Experience
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-700 to-transparent ml-4" />
          </h2>
          <div className="space-y-8">
            <ExperienceCard
              title="Senior Software Engineer"
              company="Tech Solutions Inc."
              period="2021 - Present"
              description="Lead developer for enterprise-scale applications, mentoring junior developers, and implementing best practices."
              skills={['React', 'Node.js', 'AWS', 'System Design', 'Team Leadership']}
            />
            <ExperienceCard
              title="Full Stack Developer"
              company="Digital Innovations"
              period="2018 - 2021"
              description="Developed and maintained multiple client projects, focusing on performance optimization and user experience."
              skills={['Vue.js', 'Python', 'Docker', 'CI/CD', 'Agile']}
            />
            <ExperienceCard
              title="Frontend Developer"
              company="StartUp Co"
              period="2016 - 2018"
              description="Built responsive web applications and contributed to the company's design system."
              skills={['JavaScript', 'CSS', 'UI/UX', 'Performance Optimization']}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;