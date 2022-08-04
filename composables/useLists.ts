import { useState, computed } from '#imports'

export const useLists = () => {
  const lists = useState('lists', () => [])
  const selectedList = useState('selectedList', () => null)
  const selectedGroup = useState('selectedGroup', () => null)

  const { create, update, delete: _delete } = useStrapi3()
  const client = useStrapiClient()

  const sortedLists = computed(() => {
    const l = [...lists.value]
    return l.sort(
      (a, b) =>
        a.position - b.position ||
        new Date(a.created_at) - new Date(b.created_at)
    )
  })

  const selectedShowcases = computed(() => {
    return [...selectedGroup.value.showcases].sort(
      (a, b) => a.position - b.position
    )
  })

  function setLists (payload) {
    lists.value = payload
  }
  function addList (list) {
    lists.value.push(list)
  }

  function updateList (list) {
    const index = lists.value.findIndex(item => item.id === list.id)
    if (index >= 0) { Object.assign(lists.value[index], list) } else { lists.value.push(list) }
  }

  function deleteList (list) {
    const index = lists.value.findIndex(item => item.id === list.id)
    if (index >= 0) { lists.value.splice(index, 1) }
  }

  function addGroup ({ group, list }) {
    const listIndex = lists.value.findIndex(item => item.id === list.id)
    if (listIndex >= 0) { lists.value[listIndex].groups.push(group) }
  }

  function updateGroup ({ group, list }) {
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
        selectedList.value.sort((a, b) => a.position - b.position)
      }
    }
    // Selected Group
    if (selectedGroup.value?.id === group.id) {
      Object.assign(selectedGroup.value, group)
    }
  }

  function deleteGroup ({ group, list }) {
    const listIndex = lists.value.findIndex(item => item.id === list.id)
    if (listIndex >= 0) {
      const groupIndex = lists.value[listIndex].groups.findIndex(
        item => item.id === group.id
      )
      if (groupIndex >= 0) { lists.value[listIndex].groups.splice(groupIndex, 1) }
    }
  }
  function setSelectedList (list) {
    selectedList.value = list
    // if (typeof list !== 'undefined') {
    //   selectedList.value = list
    // }
  }
  function setSelectedGroup (group) {
    selectedGroup.value = group
  }

  function updateShowcase ({ showcase, group, list }) {
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

  async function createRemoteList ({ name }) {
    const newList = await create('lists', {
      name
    })
    addList(newList)
    setSelectedList(newList)
    setSelectedGroup(null)
    return newList
  }

  async function updateRemoteList ({ name, list }) {
    const updatedList = await update('lists', list.id, {
      name
    })
    updatedList.groups = list.groups
    updateList(updatedList)
    return updatedList
  }

  async function deleteRemoteList ({ list }) {
    try {
      await _delete('lists', list.id)
      deleteList(list)
      setSelectedList(sortedLists.value[0] ? sortedLists.value[0] : null)
      setSelectedGroup(selectedList.value ? selectedList.value.groups[0] : null)
      return list
    } catch (err) {
      console.log(err)
      return false
    }
  }

  async function createRemoteGroup ({ name, list }) {
    try {
      const newGroup = await client(`lists/${list.id}/groups`, {
        method: 'POST',
        body: {
          name,
          list: list.id
        }
      })

      // what is this? why newGroup.list
      newGroup.list = list.id
      addGroup({ group: newGroup, list })
      setSelectedGroup(newGroup)
      return newGroup
    } catch (err) {
      console.log(err)
    }
  }

  async function updateRemoteGroup ({ name, group, list }) {
    try {
      const updatedGroup = await client(`lists/${list.id}/groups/${group.id}`, {
        method: 'PUT',
        body: {
          name
        }
      })

      // why updatedGroup.list?
      updatedGroup.list = list.id
      updateGroup({
        group: updatedGroup,
        list
      })
      return updatedGroup
    } catch (err) {
      // console.log(err)
    }
  }

  async function moveUpRemoteGroup ({ group, list }) {
    try {
      const groups = [...list.groups].sort((a, b) => a.position - b.position)
      const groupIndex = groups.findIndex(g => g.id === group.id)
      if (groupIndex < 1) {
        return
      }
      let position
      if (groupIndex === 1) {
        position = Number(groups[0].position) - 1000
      } else {
        position =
          (Number(groups[groupIndex - 2].position) +
            Number(groups[groupIndex - 1].position)) /
          2
      }
      const updatedGroup = await client(`lists/${list.id}/groups/${group.id}`, {
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

  async function moveDownRemoteGroup ({ group, list }) {
    try {
      const groups = [...list.groups].sort((a, b) => a.position - b.position)
      const groupIndex = groups.findIndex(g => g.id === group.id)
      if (groupIndex === -1 || groupIndex === groups.length - 1) {
        return
      }
      let position
      if (groupIndex === groups.length - 2) {
        position = Number(groups[groups.length - 1].position) + 1000
      } else {
        position =
          (Number(groups[groupIndex + 2].position) +
            Number(groups[groupIndex + 1].position)) /
          2
      }
      const updatedGroup = await client(`lists/${list.id}/groups/${group.id}`, {
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

  async function deleteRemoteGroup ({ group, list }) {
    await _delete(`lists/${list.id}/groups/${group.id}`)

    deleteGroup({
      group,
      list
    })
    setSelectedGroup(null)
    return group
  }

  async function bookmarkRemoteShowcase ({ showcase, group, list }) {
    await client(`/lists/${list.id}/groups/${group.id}/showcases`, {
      method: 'POST',
      body: {
        showcase
      }
    })

    const updatedGroup = {
      ...group,
      showcases: [showcase, ...group.showcases]
    }

    updateGroup({
      group: updatedGroup,
      list
    })

    return updatedGroup
  }

  async function unbookmarkRemoteShowcase ({ showcase, group, list }) {
    await _delete(
      `/lists/${list.id}/groups/${group.id}/showcases/${showcase.id}`
    )
    const updatedGroup = {
      ...group,
      showcases: group.showcases.filter(it => it.id !== showcase.id)
    }
    updateGroup({
      group: updatedGroup,
      list
    })
    return updatedGroup
  }

  async function moveUpRemoteShowcase ({ showcase, group, list }) {
    try {
      const showcases = [...group.showcases].sort(
        (a, b) => a.position - b.position
      )
      const showcaseIndex = showcases.findIndex(s => s.id === showcase.id)
      if (showcaseIndex < 1) {
        return
      }
      let position
      if (showcaseIndex === 1) {
        position = Number(showcases[0].position) - 1000
      } else {
        position =
          (Number(showcases[showcaseIndex - 2].position) +
            Number(showcases[showcaseIndex - 1].position)) /
          2
      }
      // const updatedShowcase = await this.$strapi.$http.$put(
      //   `lists/${list.id}/groups/${group.id}/showcases/${showcase.id}`,
      //   { position }
      // )
      const updatedShowcase = await client(
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
      const showcases = [...group.showcases].sort(
        (a, b) => a.position - b.position
      )
      const showcaseIndex = showcases.findIndex(s => s.id === showcase.id)
      if (showcaseIndex === -1 || showcaseIndex === showcases.length - 1) {
        return
      }
      let position
      if (showcaseIndex === showcases.length - 2) {
        position = Number(showcases[showcases.length - 1].position) + 1000
      } else {
        position =
          (Number(showcases[showcaseIndex + 2].position) +
            Number(showcases[showcaseIndex + 1].position)) /
          2
      }
      // const updatedShowcase = await this.$strapi.$http.$put(
      //   `lists/${list.id}/groups/${group.id}/showcases/${showcase.id}`,
      //   { position }
      // )
      const updatedShowcase = await client(
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
      console.log(err)
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
