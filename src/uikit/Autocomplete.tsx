import { FC, forwardRef, Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

export interface AutocompleteItem {
  value: string;
  label: any;
}

interface IProps {
  className?: string;
  items: AutocompleteItem[];
  label?: string;
  onSelect?: (value: AutocompleteItem) => void;
}

const Autocomplete: FC<IProps> = forwardRef<HTMLDivElement, IProps>(
  ({ className, items, label, onSelect }, ref) => {
    const [selected, setSelected] = useState(items[0]);
    const [query, setQuery] = useState('');

    const filteredResults =
      query === ''
        ? items
        : items.filter((item) =>
            item.label
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''))
          );

    useEffect(() => {
      handleSelect(selected);
    }, []);

    const handleSelect = (value: AutocompleteItem) => {
      setSelected(value);
      onSelect && onSelect(value);
    };

    return (
      <Combobox
        className={className}
        as="div"
        value={selected}
        onChange={handleSelect}
        ref={ref}
      >
        <Combobox.Label className="block text-sm font-medium text-gray-700">
          {label}
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full py-2 pl-3 pr-10 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(item: AutocompleteItem) => item.label}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 h-full px-2 rounded-r-md focus:outline-none">
            <div className="flex items-center h-full">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </Combobox.Button>

          {filteredResults.length > 0 && (
            <Combobox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredResults.map((item) => (
                <Combobox.Option
                  key={item.value}
                  value={item}
                  className={({ active }) =>
                    clsx(
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={clsx(
                          'block truncate',
                          selected && 'font-semibold'
                        )}
                      >
                        {item.label}
                      </span>

                      {selected && (
                        <div
                          className={clsx(
                            'absolute top-0 right-0 h-full pr-4',
                            active ? 'text-white' : 'text-indigo-600'
                          )}
                        >
                          <div className="flex items-center h-full">
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    );
  }
);

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete;
