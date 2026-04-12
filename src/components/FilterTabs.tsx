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
          className={`px-6 h-12 border border-brutal-black font-body font-bold text-[12px] tracking-widest uppercase transition-colors ${
            activeFilter === filter.id
              ? 'bg-brutal-black text-brutal-white'
              : 'bg-brutal-white text-brutal-black hover:bg-brutal-black hover:text-brutal-white'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
