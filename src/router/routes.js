import Core from './../core/bootstrap'
import Resources from './../resources/bootstrap'

const routes = []

// Push routes from Core
Core.routes.forEach(route => {
  routes.push(route)
});

// Push routes from Resources
Resources.routes.forEach(resourceRoutes => {
  routes.push(resourceRoutes)
})

routes.push({
  // Always leave this as last one,
  // but you can also remove it
  path: '/:catchAll(.*)*',
  component: () => import('pages/Error404.vue')
})

export default routes
