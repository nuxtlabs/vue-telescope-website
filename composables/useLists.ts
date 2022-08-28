import type { Ref } from 'vue'
import type { Group, List, Showcase } from '~/types'

export const useLists = () => {
  const lists: Ref<List[]> = useState('lists', () => [])
  const selectedList: Ref<List> = useState('selectedList', () => null)
  const selectedGroup: Ref<Group> = useState('selectedGroup', () => null)

  const { create, update, delete: _delete } = useStrapi3()
  const client = useStrapiClient()

  const sortedLists = computed(() => {
    const l: List[] = [...lists.value]
    return l.sort(
      (a, b) =>
        a.position - b.position ||
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
  })

  const selectedShowcases = computed(() => {
    // TODO: bug when update group name
    return [...selectedGroup.value.showcases].sort(
      (a, b) => a.position - b.position
    )
  })

  function setLists (payload: List[]) {
    lists.value = payload
  }
  function addList (list: List) {
    lists.value.push(list)
  }

  function updateList (list: List) {
    const index = lists.value.findIndex(item => item.id === list.id)
    if (index >= 0) { Object.assign(lists.value[index], list) } else { lists.value.push(list) }
  }

  function deleteList (list: List) {
    const index = lists.value.findIndex(item => item.id === list.id)
    if (index >= 0) { lists.value.splice(index, 1) }
  }

  function addGroup ({ group, list }: {group: Group, list: List}) {
    const listIndex = lists.value.findIndex(item => item.id === list.id)
    if (listIndex >= 0) { lists.value[listIndex].groups.push(group) }
  }

  function updateGroup ({ group, list }: {group: Group, list: List}) {
    // Lists
    const listIndex = lists.value.findIndex(item => item.id === list.id)
    if (listIndex >= 0) {
      const groupIndex = lists.value[listIndex].groups.findIndex(
        item => item.id === group.id
      )
      if (groupIndex >= 0) {
        Object.assign(lists.value[listIndex].groups[groupIndex], group)
      } else {
        lists.value[listIndex].groups.push(group)
      }
      lists.value[listIndex].groups.sort((a, b) => a.position - b.position)
    }

    // Selected List
    if (selectedList.value?.id === list.id) {
      const groupIndex = selectedList.value.groups.findIndex(
        item => item.id === group.id
      )
      if (groupIndex >= 0) {
        Object.assign(selectedList.value.groups[groupIndex], group)
        // TODO: check this line, why wrong sort
        // selectedList.value.sort((a, b) => a.position - b.position)
      }
    }
    // Selected Group
    if (selectedGroup.value?.id === group.id) {
      Object.assign(selectedGroup.value, group)
    }
  }

  function deleteGroup ({ group, list }: {group: Group, list: List}) {
    const listIndex = lists.value.findIndex(item => item.id === list.id)
    if (listIndex >= 0) {
      const groupIndex = lists.value[listIndex].groups.findIndex(
        item => item.id === group.id
      )
      if (groupIndex >= 0) { lists.value[listIndex].groups.splice(groupIndex, 1) }
    }
  }

  function setSelectedList (list: List) {
    selectedList.value = list
    // if (typeof list !== 'undefined') {
    //   selectedList.value = list
    // }
  }

  function setSelectedGroup (group: Group) {
    selectedGroup.value = group
  }

  function updateShowcase ({ showcase, group, list }: {showcase: Showcase, group: Group, list: List}) {
    // groups
    const listIndex = lists.value.findIndex(item => item.id === list.id)
    if (listIndex >= 0) {
      const groupIndex = lists.value[listIndex].groups.findIndex(
        item => item.id === group.id
      )
      if (groupIndex >= 0) {
        const showcaseIndex = lists.value[listIndex].groups[
          groupIndex
        ].showcases.findIndex(item => item.id === showcase.id)
        if (showcaseIndex >= 0) {
          Object.assign(
            lists.value[listIndex].groups[groupIndex].showcases[showcaseIndex],
            showcase
          )
        }
      }
    }
    // Selected Group
    if (selectedGroup.value?.id === group.id) {
      const showcaseIndex = selectedGroup.value.showcases.findIndex(
        item => item.id === showcase.id
      )
      if (showcaseIndex >= 0) {
        Object.assign(selectedGroup.value.showcases[showcaseIndex], showcase)
      }
    }
  }

  async function createRemoteList ({ name }: {name: string}) {
    const newList = await create<List>('lists', {
      name
    })
    addList(newList)
    setSelectedList(newList)
    setSelectedGroup(null)
    return newList
  }

  async function updateRemoteList ({ name, list }: {name: string, list: List}) {
    const updatedList = await update<List>('lists', list.id, {
      name
    })
    updatedList.groups = list.groups
    updateList(updatedList)
    return updatedList
  }

  async function deleteRemoteList ({ list }: {list: List}) {
    try {
      await _delete('lists', list.id)
      deleteList(list)
      setSelectedList(sortedLists.value[0] ? sortedLists.value[0] : null)
      setSelectedGroup(selectedList.value ? selectedList.value.groups[0] : null)
      return list
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(err)
      }
      return false
    }
  }

  async function createRemoteGroup ({ name, list }: {name: string, list: List}) {
    try {
      const newGroup = await client<Group>(`lists/${list.id}/groups`, {
        method: 'POST',
        body: {
          name,
          list: list.id
        }
      })

      // TODO: maybe remove newGroup.list
      newGroup.list = list.id
      addGroup({ group: newGroup, list })
      setSelectedGroup(newGroup)
      return newGroup
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    }
  }

  async function updateRemoteGroup ({ name, group, list }: {name: string, group: Group, list: List}) {
    try {
      const updatedGroup = await client<Group>(`lists/${list.id}/groups/${group.id}`, {
        method: 'PUT',
        body: {
          name
        }
      })

      // TODO: maybe remove updatedGroup.list
      updatedGroup.list = list.id
      updateGroup({
        group: updatedGroup,
        list
      })
      return updatedGroup
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    }
  }

  async function moveUpRemoteGroup ({ group, list }: {group: Group, list: List}) {
    try {
      const groups = [...list.groups].sort((a, b) => a.position - b.position)
      const groupIndex = groups.findIndex(g => g.id === group.id)
      if (groupIndex < 1) {
        return
      }
      let position: number
      if (groupIndex === 1) {
        position = Number(groups[0].position) - 1000
      } else {
        position =
          (Number(groups[groupIndex - 2].position) +
            Number(groups[groupIndex - 1].position)) /
          2
      }
      const updatedGroup = await client<Group>(`lists/${list.id}/groups/${group.id}`, {
        method: 'PUT',
        body: {
          position
        }
      })
      updateGroup({
        group: updatedGroup,
        list
      })
    } catch (err) {}
  }

  async function moveDownRemoteGroup ({ group, list }: {group: Group, list: List}) {
    try {
      const groups = [...list.groups].sort((a, b) => a.position - b.position)
      const groupIndex = groups.findIndex(g => g.id === group.id)
      if (groupIndex === -1 || groupIndex === groups.length - 1) {
        return
      }
      let position: number
      if (groupIndex === groups.length - 2) {
        position = Number(groups[groups.length - 1].position) + 1000
      } else {
        position =
          (Number(groups[groupIndex + 2].position) +
            Number(groups[groupIndex + 1].position)) /
          2
      }
      const updatedGroup = await client<Group>(`lists/${list.id}/groups/${group.id}`, {
        method: 'PUT',
        body: {
          position
        }
      })
      updateGroup({
        group: updatedGroup,
        list
      })
    } catch (err) {}
  }

  async function deleteRemoteGroup ({ group, list }: {group: Group, list: List}) {
    await _delete(`lists/${list.id}/groups/${group.id}`)

    deleteGroup({
      group,
      list
    })
    setSelectedGroup(null)
    return group
  }

  async function bookmarkRemoteShowcase ({ showcase, group, list }: {showcase: Showcase, group: Group, list: List}) {
    await client<Showcase>(`/lists/${list.id}/groups/${group.id}/showcases`, {
      method: 'POST',
      body: {
        showcase
      }
    })

    const updatedGroup: Group = {
      ...group,
      showcases: [showcase, ...group.showcases]
    }

    updateGroup({
      group: updatedGroup,
      list
    })

    return updatedGroup
  }

  async function unbookmarkRemoteShowcase ({ showcase, group, list }: {showcase: Showcase, group: Group, list: List}) {
    await _delete(
      `/lists/${list.id}/groups/${group.id}/showcases/${showcase.id}`
    )
    const updatedGroup: Group = {
      ...group,
      showcases: group.showcases.filter(it => it.id !== showcase.id)
    }
    updateGroup({
      group: updatedGroup,
      list
    })
    return updatedGroup
  }

  async function moveUpRemoteShowcase ({ showcase, group, list }: {showcase: Showcase, group: Group, list: List}) {
    try {
      const showcases: Showcase[] = [...group.showcases].sort(
        (a, b) => a.position - b.position
      )
      const showcaseIndex = showcases.findIndex(s => s.id === showcase.id)
      if (showcaseIndex < 1) {
        return
      }
      let position: number
      if (showcaseIndex === 1) {
        position = Number(showcases[0].position) - 1000
      } else {
        position =
          (Number(showcases[showcaseIndex - 2].position) +
            Number(showcases[showcaseIndex - 1].position)) /
          2
      }
      const updatedShowcase = await client<Showcase>(
        `lists/${list.id}/groups/${group.id}/showcases/${showcase.id}`,
        {
          method: 'PUT',
          body: {
            position
          }
        }
      )
      updateShowcase({
        showcase: updatedShowcase,
        group,
        list
      })
    } catch (err) {}
  }

  async function moveDownRemoteShowcase ({ showcase, group, list }) {
    try {
      const showcases: Showcase[] = [...group.showcases].sort(
        (a, b) => a.position - b.position
      )
      const showcaseIndex = showcases.findIndex(s => s.id === showcase.id)
      if (showcaseIndex === -1 || showcaseIndex === showcases.length - 1) {
        return
      }
      let position: number
      if (showcaseIndex === showcases.length - 2) {
        position = Number(showcases[showcases.length - 1].position) + 1000
      } else {
        position =
          (Number(showcases[showcaseIndex + 2].position) +
            Number(showcases[showcaseIndex + 1].position)) /
          2
      }
      const updatedShowcase = await client<Showcase>(
        `lists/${list.id}/groups/${group.id}/showcases/${showcase.id}`,
        {
          method: 'PUT',
          body: {
            position
          }
        }
      )
      updateShowcase({
        showcase: updatedShowcase,
        group,
        list
      })
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    }
  }

  return {
    lists,
    selectedList,
    selectedGroup,
    selectedShowcases,
    sortedLists,
    setLists,
    addList,
    updateList,
    deleteList,
    addGroup,
    updateGroup,
    deleteGroup,
    setSelectedList,
    setSelectedGroup,
    updateShowcase,
    createRemoteList,
    updateRemoteList,
    deleteRemoteList,
    createRemoteGroup,
    updateRemoteGroup,
    moveUpRemoteGroup,
    moveDownRemoteGroup,
    deleteRemoteGroup,
    bookmarkRemoteShowcase,
    unbookmarkRemoteShowcase,
    moveUpRemoteShowcase,
    moveDownRemoteShowcase
  }
}
