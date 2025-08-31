EV Analytics Dashboard

This project is an Electric Vehicle Analytics Dashboard built as part of a frontend assessment. The goal was to take the Washington State Electric Vehicle Population dataset and create an interactive dashboard that allows users to explore and visualize trends in electric vehicle adoption.

Project Overview

The dashboard is a React + TypeScript application set up using Vite as the build tool. I used TailwindCSS for styling and Recharts for the charts. To process the dataset, I integrated PapaParse which reads and cleans the CSV data before rendering it into charts and tables.

The dataset used is Electric_Vehicle_Population_Data.csv, which contains information such as vehicle make, model, year, electric range, vehicle type, and county.

What I Implemented

Data Loading and Cleaning
Used PapaParse to load the CSV file from the public/data directory.
Normalized and cleaned raw fields like Model Year, Electric Range, and County to make them usable in visualizations.

Data Visualization
A bar chart shows the top manufacturers by number of EVs.
A line chart displays EV adoption over the years.
A pie chart shows the share of different EV types (for example, Battery Electric vs Plug-in Hybrid).

Filters and Search
Added filters so users can select a specific year or county to narrow down the dataset.
Integrated a simple search box that allows filtering records by make, model, or county.

KPIs (Key Performance Indicators)
Displayed summary statistics at the top of the dashboard such as total number of EVs, average electric range, and distribution by type.

Table View
Added a searchable, scrollable table where users can browse individual EV records after applying filters.

Deployment Setup
Configured the project with Vite and Tailwind to ensure fast builds.
Deployed the app on Vercel for live access.

How to Run Locally

1.Clone the repository and move into the app folder:
git clone https://github.com/vanshik19a/analytics-dashboard-assessment.git
cd analytics-dashboard-assessment/app


2.Install dependencies:
npm install


3.Start the development server:
npm run dev


4.Build for production:
npm run build
npm run preview

Tech Stack

React 18 with TypeScript
Vite
TailwindCSS
Recharts
PapaParse
Vercel (for deployment) - https://analytics-dashboard-assessment-lovat.vercel.app/
