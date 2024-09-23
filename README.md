
# Project Overview

This project is a web application that allows users to create and manage summaries of YouTube videos. The application is built using a combination of frontend and backend technologies.

## Frontend

The frontend is built using Next.js, a popular React-based framework for building server-rendered and statically generated websites. The frontend is responsible for rendering summary cards, handling user authentication, and providing a dashboard for users to view and manage their summaries.

## Backend

The backend is built using Strapi, a headless Content Management System (CMS) that provides a RESTful API for managing content. The backend is responsible for managing summaries, handling CRUD (Create, Read, Update, Delete) operations, and providing APIs for the frontend to consume.

## Summary Management

The project defines a summary content type with attributes such as `videoId`, `title`, `summary`, and `user`. The summary is stored in a Strapi collection, and the backend provides APIs for creating, reading, updating, and deleting summaries.

## Middleware and Authentication

The project uses middleware functions to handle authentication and authorization. For example, the `on-summary-create` middleware is triggered when a new summary is created, and the `global::is-owner` middleware is used to check if the user is the owner of the summary.

## Template and Instructions

The project includes a template and instructions for generating summaries. The template provides a structure for the summary, including a title, key topics, and a YouTube video description.

## Key Features

The project has the following key features:

1. Summary creation and management
2. User authentication and authorization
3. Dashboard for viewing and managing summaries
4. APIs for frontend to consume
5. Template and instructions for generating summaries

## Technology Stack

Next.js for the frontend\
Strapi for the backend\
React for building the frontend\
Tailwind CSS for styling\
TypeScript for type checking\
OpenAI's language model to generate summaries\
Various libraries and dependencies, including @langchain/openai, @radix-ui/react-label, and react-player