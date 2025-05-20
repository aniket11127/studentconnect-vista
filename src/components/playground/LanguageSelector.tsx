
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
    <div className="w-full">
      <Select
        value={selectedLanguage}
        onValueChange={(value) => onLanguageChange(value as CodeLanguage)}
      >
        <SelectTrigger className="w-full sm:w-[280px]">
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
    </div>
  );
};
