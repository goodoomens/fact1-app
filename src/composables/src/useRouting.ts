import { useRoute, useRouter } from 'vue-router'

export default () => {
  const route = useRoute()
  const router = useRouter()

  const getParameter = (param: string): string => String(route.params[param])
  const goTo = (routeName: string, params = {}) => router.push({ name: routeName, params: { ...params } })
  const isActive = (routeName: string) => route.name === routeName

  return {
    route,
    router,
    getParameter,
    goTo,
    isActive
  }
}
