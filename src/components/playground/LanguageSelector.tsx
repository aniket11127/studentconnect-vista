
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { CodeLanguage } from './CodingPlayground';
import { languageOptions } from './playgroundConfig';

interface LanguageSelectorProps {
  selectedLanguage: CodeLanguage;
  onLanguageChange: (language: CodeLanguage) => void;
}

export const LanguageSelector = ({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <label htmlFor="language-select" className="text-sm font-medium">
        Select Language:
      </label>
      <Select
        value={selectedLanguage}
        onValueChange={(value) => onLanguageChange(value as CodeLanguage)}
      >
        <SelectTrigger id="language-select" className="w-full sm:w-[280px]">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {languageOptions.map((lang) => (
              <SelectItem key={lang.id} value={lang.id}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <span className="text-xs text-muted-foreground hidden sm:inline-block">
        {selectedLanguage === 'web' 
          ? 'Create web pages with HTML, CSS, and JavaScript' 
          : `Write and run ${languageOptions.find(l => l.id === selectedLanguage)?.name || ''} code`}
      </span>
    </div>
  );
};
