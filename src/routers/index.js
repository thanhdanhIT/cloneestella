import {
  Admin,
  Error,
  Users,
  SystemService,
  ListBooking,
  Dashboard,
  News,
  FormOnline,
  FeedBacks
} from "../page"

const routers = [
  {
    path: "/admin/*",
    component: () => <Admin />,
    Routes: [
      {
        path: "/users",
        component: () => <Users />
      },
      {
        path: "/news",
        component: () => <News />
      },
      {
        path: "/services/system",
        component: () => <SystemService />
      },
      {
        path: "/services/booking",
        component: () => <ListBooking />
      },
      {
        path: "/form-online",
        component: () => <FormOnline />
      },
      {
        path: "/dashboard",
        component: () => <Dashboard />
      },
      {
        path: "/feedbacks",
        component: () => <FeedBacks />
      }
    ]
  },
  {
    path: "/*",
    component: () => <Error />
  }
]

export default routers
