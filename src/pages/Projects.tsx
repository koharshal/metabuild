import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import FilterTabs from '../components/FilterTabs';
import { getProjects, type Project } from '../data/cmsStore';

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) setActiveFilter(category);
  }, [searchParams]);

  useEffect(() => {
    if (activeFilter === 'all') setFilteredProjects(projects);
    else setFilteredProjects(projects.filter((p) => p.category === activeFilter));
  }, [activeFilter, projects]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') setSearchParams({});
    else setSearchParams({ category: filter });
  };

  return (
    <div className="min-h-screen bg-brutal-bg pt-24">
      <section className="py-16 lg:py-24 border-b border-brutal-black">
        <div className="w-full px-6 lg:px-12">
          <span className="inline-block px-4 py-1 bg-brutal-white text-brutal-black border border-brutal-black font-bold text-[10px] tracking-widest uppercase mb-6">Our Work</span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-brutal-black uppercase tracking-tighter mb-6">Our Projects</h1>
          <p className="text-brutal-black/80 font-body text-sm max-w-2xl border-l border-brutal-black pl-4">Explore our diverse portfolio of residential, commercial, and industrial properties across Nashik and surrounding areas</p>
        </div>
      </section>

      <section className="py-8 border-b border-brutal-black bg-brutal-white">
        <div className="w-full px-6 lg:px-12 flex justify-start">
          <FilterTabs activeFilter={activeFilter} onFilterChange={handleFilterChange} />
        </div>
      </section>

      <section className="pb-24 lg:pb-32 bg-brutal-white">
        <div className="w-full px-6 lg:px-12 pt-16">
          {loading ? (
            <div className="flex justify-center py-16"><div className="animate-spin h-12 w-12 border-t-4 border-b-4 border-brutal-black"></div></div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-brutal-black">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-brutal-black bg-brutal-bg">
              <p className="text-brutal-black font-bold uppercase tracking-widest text-sm">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
