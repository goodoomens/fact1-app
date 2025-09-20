import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('vue-router', () => {
  const push = vi.fn()
  const route = { params: { id: '123', text: 'abc' } }
  return {
    useRoute: () => route,
    useRouter: () => ({ push })
  }
})

import useRouting from '../../src/composables/useRouting'

describe('useRouting composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getParameter should return route params as string', () => {
    const { getParameter } = useRouting()
    expect(getParameter('id')).toBe('123')
    expect(getParameter('text')).toBe('abc')
  })

  it('goTo should call router.push with route name and params', () => {
    const name = 'newRoute'
    const params = { id: '456' }

    const { goTo, router } = useRouting()
    const { push } = router
    goTo(name, params)
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith({ name, params })
  })
})
