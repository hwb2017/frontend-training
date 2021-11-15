import { mount } from "@vue/test-utils"
import EventHandling from "./EventHandling.vue"

test('emits an event when clicked', () => {
  const wrapper = mount(EventHandling)

  wrapper.find('button').trigger('click')
  wrapper.find('button').trigger('click')

  const incrementEvent = wrapper.emitted('increment')

  expect(incrementEvent).toHaveLength(2)
  expect(incrementEvent[0]).toEqual([1])
  expect(incrementEvent[1]).toEqual([2])
})