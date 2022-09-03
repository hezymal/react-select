import { createContext, useContext } from "react";

import en from "./en.json";
import ru from "./ru.json";

export enum Language {
    en = "en",
    ru = "ru",
}

const languages: Record<Language, Record<string, string>> = {
    [Language.en]: en,
    [Language.ru]: ru,
};

export const TranslationContext = createContext(Language.en);

export const useTranslation = () => {
    const language = useContext(TranslationContext);

    const translate = (strings: TemplateStringsArray) => {
        const text = strings[0];
        return languages[language][text] || text;
    };

    return translate;
};
