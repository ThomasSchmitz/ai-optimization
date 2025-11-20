# AI Traffic Analytics Guide & Looker Studio Template

This guide provides the configuration details needed to build a Looker Studio dashboard for tracking AI-driven traffic to your website. While we cannot host the live data connection for you, following these steps will allow you to create your own "AI Visibility" report in minutes.

## 1. The Strategy: Identifying AI Traffic

Most AI traffic currently appears in Google Analytics 4 (GA4) as "Referral" or "Direct" traffic. To track it accurately, we need to filter for specific referring domains known to be AI platforms.

### Known AI Referrers List
*   `chatgpt.com` (OpenAI)
*   `openai.com` (OpenAI)
*   `bing.com` (Microsoft Copilot - often indistinguishable from search, but look for `/chat` or specific referral paths)
*   `gemini.google.com` (Google Gemini)
*   `bard.google.com` (Legacy Gemini)
*   `claude.ai` (Anthropic)
*   `perplexity.ai` (Perplexity)
*   `you.com` (You.com)
*   `duckduckgo.com` (DuckAssist - check referral path)

## 2. GA4 Configuration (Recommended)

Before building the dashboard, creating a **Custom Channel Group** in GA4 is the most robust way to track this data.

1.  Go to **Admin** > **Data display** > **Channel groups**.
2.  Click **Create new channel group**.
3.  Name it "AI & Search Channels".
4.  Create a new channel named **"AI Chatbots"**.
5.  Define the rule:
    *   `Source` matches regex `chatgpt|openai|gemini|bard|claude|perplexity|you\.com`
6.  Save the group.

*Note: This will only categorize future traffic. For historical data, we will use filters in Looker Studio.*

## 3. Looker Studio Setup Guide

### Step 1: Create a New Report
1.  Go to [Looker Studio](https://lookerstudio.google.com/).
2.  Click **Create** > **Report**.
3.  Select **Google Analytics** as your data source.
4.  Choose your website's GA4 property.

### Step 2: Create the "AI Traffic" Segment
Since we want to see historical data, we'll create a calculated field or a filter directly in Looker Studio.

**Option A: The Filter Method (Easiest)**
1.  Select a chart (e.g., a Time Series chart).
2.  In the **Setup** tab, scroll down to **Filters**.
3.  Click **Add a Filter**.
4.  Name it: `Include - AI Traffic Only`.
5.  Logic: `Include` > `Session Source` > `RegExp Contains`.
6.  Value: `chatgpt|openai|gemini|bard|claude|perplexity|you\.com`

**Option B: The Calculated Field Method (Best for Tables)**
1.  In the **Data** panel, click **Add a Field**.
2.  Name it: `Traffic Category`.
3.  Formula:
    ```sql
    CASE
      WHEN REGEXP_MATCH(Session Source, ".*(chatgpt|openai|gemini|bard|claude|perplexity|you\\.com).*") THEN "AI Chatbot"
      WHEN Session Medium = "organic" THEN "Organic Search"
      ELSE "Other"
    END
    ```

### Step 3: Build the Visualizations

**Chart 1: AI Traffic Over Time**
*   **Type:** Time Series Chart
*   **Dimension:** Date
*   **Metric:** Sessions
*   **Filter:** Apply the `Include - AI Traffic Only` filter.

**Chart 2: Top AI Referrers**
*   **Type:** Bar Chart or Pie Chart
*   **Dimension:** Session Source
*   **Metric:** Sessions, Engaged Sessions, Conversions
*   **Filter:** Apply the `Include - AI Traffic Only` filter.

**Chart 3: AI vs. SEO Comparison**
*   **Type:** Table
*   **Dimension:** `Traffic Category` (from Option B above)
*   **Metrics:** Sessions, Engagement Rate, Average Session Duration, Key Events (Conversions)

## 4. Advanced: Tracking "AI Overviews" (AIO)

Tracking traffic specifically from Google's AI Overviews (AIO) is difficult because Google does not currently separate it from standard organic search in GA4.

**Workaround using Search Console:**
1.  Connect **Google Search Console** as a second data source.
2.  Look for queries that are "informational" or "question-based" (Who, What, Where, How).
3.  Create a filter for queries containing `how to|what is|best|guide|vs`.
4.  While not perfect, a spike in impressions for these queries with a lower CTR *might* indicate the answer is being provided directly in an AI Overview (Zero-Click Search).

## 5. Downloadable Template Link

*Coming Soon: We are finalizing a public read-only link to a pre-built template that you can copy. Check back in Q1 2026.*
