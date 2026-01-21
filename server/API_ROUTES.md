# Backend Valid Routes

This document lists all the active, working routes currently implemented in the backend.

**Base URL**: `http://localhost:5000` (default)

## 🔐 Auth (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user | ❌ |
| `POST` | `/login` | User login | ❌ |

## 👤 User (`/api/user`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/profile` | Get current user's profile | ✅ |

## 🧩 Problems (`/api/problems`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get all problems (Recent first) | ✅ |
| `POST` | `/` | Create a new problem | ✅ |
| `GET` | `/:id` | Get a specific problem by ID | ✅ |
| `PUT` | `/:id` | Update a problem | ✅ |
| `DELETE` | `/:id` | Delete a problem | ✅ |
| `GET` | `/folders` | Get folder/topic statistics | ✅ |
| `GET` | `/recent` | Get recently accessed problems | ✅ |
| `GET` | `/search` | Search problems (`?q=query`) | ✅ |
| `GET` | `/filter` | Filter problems (`?difficulty=`, `?topic=`, etc.) | ✅ |
| `PATCH` | `/:id/toggle-solved`| Toggle problem solved status | ✅ |
| `POST` | `/:id/generate-analysis`| Generate AI analysis for a problem | ✅ |

### Debug Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/debug/all` | List all problems (Debug) | ✅ |
| `POST` | `/debug/mark-solved/:id`| Force mark a problem as solved | ✅ |
| `POST` | `/debug/create-solved`| Create a dummy solved problem | ✅ |

## 📊 Dashboard (`/api/dashboard`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/summary` | Get dashboard summary data | ✅ |
| `GET` | `/topics` | Get topic-wise statistics | ✅ |
| `GET` | `/streak` | Get user streak info | ✅ |
| `GET` | `/activity` | Get user activity data | ✅ |
| `GET` | `/complexity-trend` | Get complexity trend data | ✅ |

## 🏆 Leaderboard (`/api/leaderboard`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get global leaderboard | ✅ |

## 📤 Export (`/api/export`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/problems/csv` | Export problems as CSV | ✅ |
| `GET` | `/problems/pdf` | Export problems as PDF | ✅ |

## ℹ️ Miscellaneous
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Health check ("Backend is running 🚀") | ❌ |

---

> [!NOTE]
> *   `authRoutes.js`, `userRoutes.js`, `problemRoutes.js`, `dashboardRoutes.js`, `leaderboardRoutes.js`, `exportRoutes.js`, and `pdfRoutes.js` are correctly mounted.
> *   `aiRoutes.js` and `folderRoutes.js` exist in the `routes/` directory but are **empty** and **not mounted** in `server.js`.
