import { mount } from "@vue/test-utils"
import ConditionalRendering from "./ConditionalRendering.vue"

test('renders a profile link', () => {
  const wrapper = mount(ConditionalRendering, {
    data() {
      return {
        admin: true
      }
    }
  })

  expect(wrapper.get('#admin').text()).toEqual('Admin')
})