# Fresh Ideas

This document tracks new ideas for the AI GEO website. Ideas listed here should be evaluated and, if approved, incorporated into the [ROADMAP.md](ROADMAP.md) or implemented directly.

---

## 📋 Copy-and-Paste Template

Use this template to add new ideas to this document:

```markdown
### [Idea Title]
**Submitted**: [Date]  
**Category**: [Platform / Guide / Tool / Content / Feature / Other]  
**Priority**: [High / Medium / Low]  
**Status**: 🆕 New

**Description**: 
[Brief description of the idea]

**Rationale**: 
[Why this idea would be valuable]

**Implementation Notes**:
- [Key consideration 1]
- [Key consideration 2]
- [etc.]

**Estimated Effort**: [Small / Medium / Large]

---
```

---

## Status Legend

- 🆕 **New** - Idea submitted, not yet reviewed
- 🔄 **Under Review** - Being evaluated for inclusion in roadmap
- ✅ **Approved** - Approved and added to roadmap
- 🚀 **Implemented** - Idea has been implemented
- ❌ **Declined** - Not moving forward with this idea
- 🔮 **Future** - Good idea but not prioritized yet

---

## AI Requirements

**For AI agents working on this repository:**

1. **Review Fresh Ideas Regularly**: When starting work, review this document for new ideas that should be incorporated
2. **Update Status**: As you review ideas, update their status accordingly
3. **Incorporate into Roadmap**: When an idea is approved (✅ Approved):
   - Add it to the appropriate phase in ROADMAP.md
   - Assign it a PR number
   - Include all relevant details (priority, effort, dependencies, description)
   - Update the idea status to 🚀 Implemented once added to roadmap
4. **Keep This Document Clean**: Archive or remove implemented ideas after 30 days
5. **Document Decisions**: If declining an idea, add a brief note explaining why

---

## Current Ideas

### AI Platform Updates Notification System
**Submitted**: 2025-11-17  
**Category**: Feature  
**Priority**: Medium  
**Status**: 🆕 New

**Description**: 
Create a system to notify users when major AI platforms release updates that affect optimization strategies.

**Rationale**: 
AI platforms change frequently. Users would benefit from timely notifications about changes that impact their optimization efforts.

**Implementation Notes**:
- Could be implemented as a newsletter subscription
- Could integrate with RSS/blog feed
- Should monitor official platform blogs and release notes
- Consider email notifications or in-site notification system

**Estimated Effort**: Medium

---

### Interactive Schema Markup Builder
**Submitted**: 2025-11-17  
**Category**: Tool  
**Priority**: High  
**Status**: 🆕 New

**Description**: 
Build an interactive tool that helps users generate proper schema markup for their websites without needing to understand JSON-LD syntax.

**Rationale**: 
Schema markup is critical for AI optimization but many marketers find it technically challenging. A visual builder would lower the barrier to entry.

**Implementation Notes**:
- Should support common schema types: Product, Review, FAQ, Article, Organization, LocalBusiness
- Provide live preview of generated JSON-LD
- Include validation against Schema.org specifications
- Offer copy-to-clipboard functionality
- Could be part of PR #24 or a standalone PR

**Estimated Effort**: Large

---

### AI Visibility Score Calculator
**Submitted**: 2025-11-17  
**Category**: Tool  
**Priority**: High  
**Status**: 🆕 New

**Description**: 
Create a self-assessment tool where users can input information about their current optimization efforts and receive a score showing their AI visibility maturity.

**Rationale**: 
Helps users understand where they currently stand and what areas need improvement. Provides a baseline for measuring progress.

**Implementation Notes**:
- Questions about website technical setup, content strategy, social presence, E-E-A-T signals
- Weighted scoring system based on impact
- Generate personalized recommendations based on gaps
- Option to download report as PDF
- Could align with PR #24

**Estimated Effort**: Medium to Large

---

### Industry-Specific AI Query Examples Library
**Submitted**: 2025-11-17  
**Category**: Content  
**Priority**: Medium  
**Status**: 🆕 New

**Description**: 
Create a searchable library of real AI queries organized by industry, showing how people ask questions in different verticals.

**Rationale**: 
Understanding actual query patterns helps marketers optimize for how their audience really uses AI tools.

**Implementation Notes**:
- Categorize by industry (e-commerce, B2B, local business, healthcare, etc.)
- Include examples from different AI platforms (ChatGPT, Gemini, Perplexity, etc.)
- Show query variations and follow-up questions
- Link to relevant optimization guides
- Could be part of Phase 4 industry guides or standalone resource

**Estimated Effort**: Large (requires significant research and curation)

---

### Before/After Case Study Template
**Submitted**: 2025-11-17  
**Category**: Tool / Content  
**Priority**: Medium  
**Status**: 🆕 New

**Description**: 
Provide a standardized template for documenting AI optimization case studies showing before/after metrics.

**Rationale**: 
Consistent case study format makes it easier to understand results and compare approaches. Helps users document their own success stories.

**Implementation Notes**:
- Include sections for: baseline metrics, strategy implemented, timeline, results, key learnings
- Provide downloadable template (PDF/Word/Markdown)
- Could be incorporated into PR #27 (Case Studies)
- Examples could populate the case studies section

**Estimated Effort**: Small

---

### AI Platform Comparison Matrix
**Submitted**: 2025-11-17  
**Category**: Tool / Content  
**Priority**: Medium  
**Status**: 🆕 New

**Description**: 
Interactive comparison table showing key features, optimization factors, and audience characteristics across all major AI platforms.

**Rationale**: 
Helps users quickly understand which platforms to prioritize based on their business type and target audience.

**Implementation Notes**:
- Compare platforms on dimensions like: audience size, citation behavior, content preferences, technical requirements
- Allow filtering and sorting
- Include links to platform-specific deep-dive guides
- Update regularly as platforms evolve
- Could be on homepage or standalone resource page

**Estimated Effort**: Medium

---

## Archive

_Ideas that have been implemented or declined will be moved here after 30 days_

---

## Contributing Ideas

Have an idea for improving the AI GEO website? Add it using the template above or [open an issue on GitHub](https://github.com/ThomasSchmitz/ai-optimization/issues) with the label `enhancement`.
