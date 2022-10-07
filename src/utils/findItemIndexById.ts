interface Item {
  id: string
}

export const findItemIndexById = <TaskI extends Item>(items: TaskI[], id: string) => {
  return items.findIndex((item: TaskI) => item.id === id)
}