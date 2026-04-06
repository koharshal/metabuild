import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import FilterTabs from '../components/FilterTabs';
import { getProjects } from '../data/cmsStore';

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const projects = getProjects();
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setActiveFilter(category);
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeFilter));
    }
  }, [activeFilter, projects]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: filter });
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black pt-24">
      {/* Header */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="inline-block px-6 py-2 border border-luxury-gold/30 text-luxury-gold text-xs tracking-[0.3em] uppercase mb-6">
            Our Work
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-luxury-white mb-6">
            Our Projects
          </h1>
          <p className="text-luxury-muted max-w-2xl text-lg">
            Explore our diverse portfolio of residential, commercial, and industrial properties across Nashik and surrounding areas
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-luxury-muted text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
