export const state = () => ({
  collections: [],
  selectedCollection: null,
  selectedGroup: null
})

export const getters = {
  sortedCollections(state) {
    const c = [...state.collections]
    return c.sort(
      (a, b) =>
        a.position - b.position ||
        new Date(a.created_at) - new Date(b.created_at)
    )
  }
}

export const mutations = {
  setCollections(state, collections) {
    state.collections = collections
  },
  addCollection(state, collection) {
    state.collections.push(collection)
  },
  updateCollection(state, collection) {
    const index = state.collections.findIndex(
      (item) => item.id === collection.id
    )
    if (index >= 0) Object.assign(state.collections[index], collection)
    else state.collections.push(collection)
  },
  deleteCollection(state, collection) {
    const index = state.collections.findIndex(
      (item) => item.id === collection.id
    )
    if (index >= 0) state.collections.splice(index, 1)
  },
  addGroup(state, { group, collection }) {
    const collectionIndex = state.collections.findIndex(
      (item) => item.id === collection.id
    )
    if (collectionIndex >= 0)
      state.collections[collectionIndex].groups.push(group)
  },
  updateGroup(state, { group, collection }) {
    // collections
    const collectionIndex = state.collections.findIndex(
      (item) => item.id === collection.id
    )
    if (collectionIndex >= 0) {
      const groupIndex = state.collections[collectionIndex].groups.findIndex(
        (item) => item.id === group.id
      )
      if (groupIndex >= 0) {
        Object.assign(
          state.collections[collectionIndex].groups[groupIndex],
          group
        )
      } else {
        state.collections[collectionIndex].groups.push(group)
      }
      state.collections[collectionIndex].groups.sort(
        (a, b) => a.position - b.position
      )
    }
    // selected collection
    if (state.selectedCollection?.id === collection.id) {
      const groupIndex = state.selectedCollection.groups.findIndex(
        (item) => item.id === group.id
      )
      if (groupIndex >= 0) {
        Object.assign(state.selectedCollection.groups[groupIndex], group)
        state.selectedCollection.sort((a, b) => a.position - b.position)
      }
    }
    // selected group
    if (state.selectedGroup?.id === group.id) {
      Object.assign(state.selectedGroup, group)
    }
  },
  deleteGroup(state, { group, collection }) {
    const collectionIndex = state.collections.findIndex(
      (item) => item.id === collection.id
    )
    if (collectionIndex >= 0) {
      const groupIndex = state.collections[collectionIndex].groups.findIndex(
        (item) => item.id === group.id
      )
      if (groupIndex >= 0)
        state.collections[collectionIndex].groups.splice(groupIndex, 1)
    }
  },
  setSelectedCollection(state, collection) {
    state.selectedCollection = collection
    // if (typeof collection !== 'undefined') {
    //   state.selectedCollection = collection
    // }
  },
  setSelectedGroup(state, group) {
    state.selectedGroup = group
  },
  updateShowcase(state, { showcase, group, collection }) {
    // groups
    const collectionIndex = state.collections.findIndex(
      (item) => item.id === collection.id
    )
    if (collectionIndex >= 0) {
      const groupIndex = state.collections[collectionIndex].groups.findIndex(
        (item) => item.id === group.id
      )
      if (groupIndex >= 0) {
        const showcaseIndex = state.collections[collectionIndex].groups[
          groupIndex
        ].showcases.findIndex((item) => item.id === showcase.id)
        if (showcaseIndex >= 0) {
          Object.assign(
            state.collections[collectionIndex].groups[groupIndex].showcases[
              showcaseIndex
            ],
            showcase
          )
        }
      }
    }
    // selected group
    if (state.selectedGroup?.id === group.id) {
      const showcaseIndex = state.selectedGroup.showcases.findIndex(
        (item) => item.id === showcase.id
      )
      if (showcaseIndex >= 0) {
        Object.assign(state.selectedGroup.showcases[showcaseIndex], showcase)
      }
    }
  }
}

export const actions = {
  async createCollection({ commit }, { name }) {
    const newCollection = await this.$strapi.create('lists', {
      name
    })
    commit('addCollection', newCollection)
    commit('setSelectedCollection', newCollection)
    commit('setSelectedGroup', null)
    return newCollection
  },
  async updateCollection({ commit }, { name, collection }) {
    const updatedCollection = await this.$strapi.update(
      'lists',
      collection.id,
      {
        name
      }
    )
    updatedCollection.groups = collection.groups
    commit('updateCollection', updatedCollection)
    return updatedCollection
  },
  async deleteCollection({ commit, state, getters }, { collection }) {
    try {
      await this.$strapi.delete('lists', collection.id)
      commit('deleteCollection', collection)
      commit(
        'setSelectedCollection',
        getters.sortedCollections[0] ? getters.sortedCollections[0] : null
      )
      commit(
        'setSelectedGroup',
        state.selectedCollection ? state.selectedCollection.groups[0] : null
      )
      return collection
    } catch (err) {
      console.log(err)
      return false
    }
  },
  async createGroup({ commit }, { name, collection }) {
    try {
      const newGroup = await this.$strapi.$http.$post(
        `lists/${collection.id}/groups`,
        {
          name,
          list: collection.id
        }
      )
      // what is this? why newGroup.list
      newGroup.list = collection.id
      commit('addGroup', { group: newGroup, collection })
      commit('setSelectedGroup', newGroup)
      return newGroup
    } catch (err) {
      // console.log(err)
    }
  },
  async updateGroup({ commit }, { name, group, collection }) {
    try {
      const updatedGroup = await this.$strapi.$http.$put(
        `lists/${collection.id}/groups/${group.id}`,
        {
          name
        }
      )
      // why updatedGroup.list?
      updatedGroup.list = collection.id
      commit('updateGroup', {
        group: updatedGroup,
        collection
      })
      return updatedGroup
    } catch (err) {
      // console.log(err)
    }
  },
  async moveUpGroup({ commit }, { group, collection }) {
    try {
      const groups = [...collection.groups].sort(
        (a, b) => a.position - b.position
      )
      const groupIndex = groups.findIndex((g) => g.id === group.id)
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
      const updatedGroup = await this.$strapi.$http.$put(
        `lists/${collection.id}/groups/${group.id}`,
        { position }
      )
      commit('updateGroup', {
        group: updatedGroup,
        collection
      })
    } catch (err) {}
  },
  async moveDownGroup({ commit }, { group, collection }) {
    try {
      const groups = [...collection.groups].sort(
        (a, b) => a.position - b.position
      )
      const groupIndex = groups.findIndex((g) => g.id === group.id)
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
      const updatedGroup = await this.$strapi.$http.$put(
        `lists/${collection.id}/groups/${group.id}`,
        { position }
      )
      commit('updateGroup', {
        group: updatedGroup,
        collection
      })
    } catch (err) {}
  },
  async deleteGroup({ commit }, { group, collection }) {
    await this.$strapi.$http.$delete(
      `lists/${collection.id}/groups/${group.id}`
    )
    commit('deleteGroup', {
      group,
      collection
    })
    commit('setSelectedGroup', null)
    return group
  },
  async bookmarkShowcase({ commit }, { showcase, group, collection }) {
    await this.$strapi.$http.$post(
      `/lists/${collection.id}/groups/${group.id}/showcases`,
      {
        showcase
      }
    )
    const updatedGroup = {
      ...group,
      showcases: [showcase, ...group.showcases]
    }
    commit('updateGroup', {
      group: updatedGroup,
      collection
    })
    return updatedGroup
  },
  async unbookmarkShowcase({ commit }, { showcase, group, collection }) {
    await this.$strapi.$http.$delete(
      `/lists/${collection.id}/groups/${group.id}/showcases/${showcase.id}`
    )
    const updatedGroup = {
      ...group,
      showcases: group.showcases.filter((it) => it.id !== showcase.id)
    }
    commit('updateGroup', {
      group: updatedGroup,
      collection
    })
    return updatedGroup
  },
  async moveUpShowcase({ commit }, { showcase, group, collection }) {
    try {
      const showcases = [...group.showcases].sort(
        (a, b) => a.position - b.position
      )
      const showcaseIndex = showcases.findIndex((s) => s.id === showcase.id)
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
      const updatedShowcase = await this.$strapi.$http.$put(
        `lists/${collection.id}/groups/${group.id}/showcases/${showcase.id}`,
        { position }
      )
      commit('updateShowcase', {
        showcase: updatedShowcase,
        group,
        collection
      })
    } catch (err) {}
  },
  async moveDownShowcase({ commit }, { showcase, group, collection }) {
    try {
      const showcases = [...group.showcases].sort(
        (a, b) => a.position - b.position
      )
      const showcaseIndex = showcases.findIndex((s) => s.id === showcase.id)
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
      const updatedShowcase = await this.$strapi.$http.$put(
        `lists/${collection.id}/groups/${group.id}/showcases/${showcase.id}`,
        { position }
      )
      commit('updateShowcase', {
        showcase: updatedShowcase,
        group,
        collection
      })
    } catch (err) {}
  }
}
