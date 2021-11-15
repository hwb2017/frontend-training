import { mount } from '@vue/test-utils'
import TodoApp from './ToDoApp.vue'

test('renders a todo', async () => {
  const wrapper = mount(TodoApp)

  await wrapper.get('[data-test="todo-checkbox"]').setValue(true)

  expect(wrapper.get('[data-test="todo"]').classes()).toContain('completed')
})
