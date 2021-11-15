import { mount, flushPromises } from "@vue/test-utils"
import axios from 'axios'
import HttpRequests from "./HttpRequests.vue"

const mockPostList = [
  { id: 1, title: 'title1' },
  { id: 2, title: 'title2' }
]

jest.mock('axios', () => ({
  get: jest.fn(() => mockPostList)
}))

test('loads posts on button click', async () => {
  const wrapper = mount(HttpRequests)

  expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  expect(wrapper.get('button').attributes()).not.toHaveProperty('disabled')

  await wrapper.get('button').trigger('click')

  expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  expect(wrapper.get('button').attributes()).toHaveProperty('disabled')

  await flushPromises()

  const posts = wrapper.findAll('[data-test="post"]')
  expect(posts).toHaveLength(2)
  expect(posts[0].text()).toContain('title1')
  expect(posts[1].text()).toContain('title2')

  expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  expect(wrapper.get('button').attributes()).not.toHaveProperty('disabled')
})