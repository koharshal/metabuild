interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterTabs = ({ activeFilter, onFilterChange }: FilterTabsProps) => {
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'industrial', label: 'Industrial' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-6 py-3 text-xs tracking-widest uppercase transition-all duration-300 ${
            activeFilter === filter.id
              ? 'bg-luxury-gold text-luxury-black'
              : 'border border-luxury-gray text-luxury-muted hover:border-luxury-gold hover:text-luxury-white'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
