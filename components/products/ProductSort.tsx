'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sortOptions } from '@/lib/data';
import { useStore } from '@/lib/store';

export default function ProductSort() {
  const { state, dispatch } = useStore();

  const handleSortChange = (value: string) => {
    dispatch({ type: 'SET_SORT_BY', payload: value });
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Saralash:</span>
      <Select value={state.sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}