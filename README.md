
# NASA Dashboard Take-Home Challenge

This application contains a dashboard to display a list of the closest objects to Earth (aka "Near Earth Objects", or "NEO" for short) for a given date range. I've sourced the data from [NASA's "Asteroids NeoWs: Near Earth Object Web Service" API](https://api.nasa.gov/).

<img width="1000" height="888" alt="Screenshot 2025-08-30 at 11 39 54 AM" src="https://github.com/user-attachments/assets/d00f80ef-defd-472b-930c-0233061047dc" />

## Installation
```bash
# Clone and install dependencies
git clone https://github.com/JonSchwartz93/nasa-dashboard-challenge
cd nasa-dashboard-challenge
npm run install:all

# Start development server
npm run dev
```

**For convenience:**
- The `npm run install:all` command simultaneously installs the npm packages for both the `frontend` and `backend` directories
- To make `npm run dev` a bit more seamless, I've used [concurrently](https://www.npmjs.com/package/concurrently) which allows you to run multiple npm commands at the same time (i.e. you can run the frontend and backend of the application simultaneously w/ a single command)


## Tech Stack

| Category          | Technology               | Version        |
| ----------------- | ------------------------ | -------------- |
| **Frontend**      | React                    | 19.1.1         |
| **Data Fetching** | Tanstack Query       | 5.85.5         |
| **Backend**       | Fastify + axios                | 5.5.0  + 1.11.0 |
| **UI/Styling**       | TailwindCSS             | 3.4.17         |
| **Code Quality**  | ESLint + Prettier        | 9.34.0 + 3.6.2 |

## Project Structure
```
nasa-dashboard/
├── README.md
├── backend/
    └── src/
        ├── routes/
        │   └── neo.ts              # create /api/neo route
        ├── types/
        │   └── nasa.ts
        ├── utils/
        │   └── formatAsteroid.ts   # format NASA NEO API response for frontend
        ├── server.ts               # instantiate Fastify server
├── frontend/
    └── src/
        ├── api/
        │   └── nasa.ts            # frontend route to Fastify backend
        ├── components/
        │   └── AsteroidTable.tsx  
        │   └── DatePicker.tsx
        │   └── styles.ts          # TailwindCSS styles for AsteroidTable
        ├── hooks/
        │   └── useNasaQuery.ts    # react hook to handle API calls
        ├── types/
        │   └── nasa.ts            
        ├── utils/
        │   └── sortAsteroids.ts   # create /api/neo route
        ├── App.tsx                # main React component that renders dashboard
        ├── index.css              # TailwindCSS configuration
        ├── index.tsx              # root of React app
```
## API Reference

#### Get all Near Earth Objects for a given date range

```http
  GET /api/neo
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `start_date` | `string` | **Required:** Start date for asteroid search |
| `end_date` | `string` | _Optional:_ End date for asteroid search (defaulted to start_date) |
| `api_key` | `string` | **Required:** Your API key |

If you navigate to [http://localhost:3001/documentation](http://localhost:3001/documentation), you'll find the Swagger documentation outlining the `GET /api/neo` endpoint.
## Features
- Select a `start_date` and `end_date` using the `<DatePickers/>`
- Sort the `<AsteroidTable>` by `name`, `size (miles)`, `distance (miles)`, and `velocity (mph)`.

## Future Improvements
- Improved loading states in the `<AsteroidTable>` component. It's a bit choppy at the moment. One approach that I personally like and believe makes for a seamless user experience is to use [skeleton loaders](https://www.chakra-ui.com/docs/components/skeleton)
- I'd like to paginate the data we get back from NASA. UI-wise, this might include a <Prev/[page #]/Next> style pagination or we could fetch additional advocates as the user scrolls. An infinite-scroll experience is relatively easy to implement using @tanstack-query's [useInfiniteQuery hook](https://tanstack.com/query/v4/docs/framework/react/reference/useInfiniteQuery).
- On the topic of pagination, I'd like to fetch an initial batch of asteroids server-side so that they are visible when a user iniitally lands on the dashboard.
- Improve the mobile-responsiveness of the application
- Add the ability for users to adjust unit of measurement (miles vs. kilometers vs. meters vs. feet)
- Improve overall error handling/edge cases
