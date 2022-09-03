import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { Language, TranslationContext } from "./i18n";
import { AdvancedUsagePage } from "./pages/AdvancedUsagePage";
import { ApiPage } from "./pages/ApiPage";
import { GettingStartedPage } from "./pages/GettingStartedPage";
import { HomePage } from "./pages/HomePage";
import { GlobalStyle } from "./components/GlobalStyle";

export const App: React.FC = () => {
    const [language, setLanguage] = useState(Language.ru);

    return (
        <BrowserRouter>
            <TranslationContext.Provider value={language}>
                <GlobalStyle />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout
                                language={language}
                                onLanguageChange={setLanguage}
                            />
                        }
                    >
                        <Route index element={<HomePage />} />
                        <Route
                            path="/getting-started"
                            element={<GettingStartedPage />}
                        />
                        <Route path="/advanced-usage" element={<AdvancedUsagePage />} />
                        <Route path="/api" element={<ApiPage />} />
                    </Route>
                </Routes>
            </TranslationContext.Provider>
        </BrowserRouter>
    );
};
