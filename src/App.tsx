import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Layout } from "./layouts/Layout";
import { Home } from "./pages/Home";
import { Universities } from "./pages/Universities";
import { UniversityDashboard } from "./pages/UniversityDashboard";
import { SubjectDetail } from "./pages/SubjectDetail";
import { QuestionPapers } from "./pages/QuestionPapers";
import { BareActs } from "./pages/BareActs";
import { CaseLaws } from "./pages/CaseLaws";
import { LawBuddyAI } from "./pages/LawBuddyAI";
import { Judiciary } from "./pages/Judiciary";
import { Blog } from "./pages/Blog";
import { BlogDetail } from "./pages/BlogDetail";
import { Premium } from "./pages/Premium";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Notes } from "./pages/Notes";
import { Admin } from "./pages/Admin";
import { SearchResults } from "./pages/SearchResults";
import { Contact } from "./pages/Contact";
import { LegalDocs } from "./pages/LegalDocs";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/university/:universityId" element={<UniversityDashboard />} />
            <Route path="/subject/:subjectId" element={<SubjectDetail />} />
            <Route path="/question-papers" element={<QuestionPapers />} />
            <Route path="/bare-acts" element={<BareActs />} />
            <Route path="/case-laws" element={<CaseLaws />} />
            <Route path="/ai-assistant" element={<LawBuddyAI />} />
            <Route path="/judiciary" element={<Judiciary />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:blogId" element={<BlogDetail />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/compliance" element={<LegalDocs />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}

