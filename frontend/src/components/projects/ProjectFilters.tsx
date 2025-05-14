'use client';

import { ProjectFilter, ProjectFiltersProps } from '@/types/project';

export default function ProjectFilters({
  filters,
  onFilterChange,
  availableTechnologies,
  availablePhases,
  availableRoles,
}: ProjectFiltersProps) {
  const handleFilterChange = (
    category: keyof ProjectFilter,
    value: string,
    checked: boolean
  ) => {
    const newFilters = { ...filters };
    if (checked) {
      newFilters[category] = [...filters[category], value];
    } else {
      newFilters[category] = filters[category].filter((item) => item !== value);
    }
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        フィルター
      </h3>

      {/* 技術スタック */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          技術スタック
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableTechnologies.map((tech) => (
            <label
              key={tech}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                checked={filters.technologies.includes(tech)}
                onChange={(e) =>
                  handleFilterChange('technologies', tech, e.target.checked)
                }
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">{tech}</span>
            </label>
          ))}
        </div>
      </div>

      {/* フェーズ */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          フェーズ
        </h4>
        <div className="flex flex-wrap gap-2">
          {availablePhases.map((phase) => (
            <label
              key={phase}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                checked={filters.phases.includes(phase)}
                onChange={(e) =>
                  handleFilterChange('phases', phase, e.target.checked)
                }
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">{phase}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 役割 */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          役割
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableRoles.map((role) => (
            <label
              key={role}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                checked={filters.roles.includes(role)}
                onChange={(e) =>
                  handleFilterChange('roles', role, e.target.checked)
                }
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">{role}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 